import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface ItemCarrinho {
  nome: string;
  preco: number;
  qtd: number;
  img: string;
  tamanho: string;
}

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {
  private itensSubject = new BehaviorSubject<ItemCarrinho[]>(this.carregar());
  itens$ = this.itensSubject.asObservable();

  private carregar(): ItemCarrinho[] {
    const c = localStorage.getItem('carrinho');
    return c ? JSON.parse(c) : [];
  }

  private salvar(itens: ItemCarrinho[]): void {
    localStorage.setItem('carrinho', JSON.stringify(itens));
    this.itensSubject.next(itens);
  }

  getItens(): ItemCarrinho[] {
    return this.itensSubject.value;
  }

  adicionar(item: ItemCarrinho): void {
    const itens = this.getItens();
    const existente = itens.find(i => i.nome === item.nome && i.tamanho === item.tamanho);
    if (existente) {
      existente.qtd += item.qtd;
    } else {
      itens.push(item);
    }
    this.salvar(itens);
  }

  remover(index: number): void {
    const itens = this.getItens();
    itens.splice(index, 1);
    this.salvar(itens);
  }

  alterarQtd(index: number, qtd: number): void {
    const itens = this.getItens();
    if (qtd <= 0) {
      itens.splice(index, 1);
    } else {
      itens[index].qtd = qtd;
    }
    this.salvar(itens);
  }

  limpar(): void {
    this.salvar([]);
  }

  total(): number {
    return this.getItens().reduce((s, i) => s + i.preco * i.qtd, 0);
  }

  quantidade(): number {
    return this.getItens().reduce((s, i) => s + i.qtd, 0);
  }
}