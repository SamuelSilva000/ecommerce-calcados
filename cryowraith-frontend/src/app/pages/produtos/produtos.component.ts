import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProdutoService, Produto } from '../../services/produto.service';
import { CarrinhoService } from '../../services/carrinho.service';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-produtos',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css']
})
export class ProdutosComponent implements OnInit {
  produtos: Produto[] = [];
  todos: Produto[] = [];
  filtro = 'Todos';
  busca = '';
  ordem = 'padrao';
  tipos: string[] = ['Todos'];

  constructor(
    private produtoService: ProdutoService,
    private carrinhoService: CarrinhoService,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.produtoService.listar().subscribe(p => {
      this.todos = p;
      this.tipos = ['Todos', ...new Set(p.map(x => x.tipo))];
      this.aplicarFiltros();
    });
  }

  filtrar(tipo: string): void {
    this.filtro = tipo;
    this.aplicarFiltros();
  }

  aplicarFiltros(): void {
    let lista = [...this.todos];
    if (this.filtro !== 'Todos') {
      lista = lista.filter(p => p.tipo === this.filtro);
    }
    if (this.busca) {
      const b = this.busca.toLowerCase();
      lista = lista.filter(p => p.nome.toLowerCase().includes(b) || p.descricao.toLowerCase().includes(b));
    }
    if (this.ordem === 'menor') lista.sort((a, b) => a.preco - b.preco);
    if (this.ordem === 'maior') lista.sort((a, b) => b.preco - a.preco);
    this.produtos = lista;
  }

  verDetalhes(p: Produto): void {
    localStorage.setItem('produtoDetalhe', JSON.stringify(p));
    location.href = '/detalhes';
  }

  comprar(p: Produto): void {
    this.carrinhoService.adicionar({
      nome: p.nome,
      preco: p.preco,
      qtd: 1,
      img: p.imagem,
      tamanho: 'Único'
    });
    this.modalService.confirmar(
      `${p.nome} adicionado à sacola. Ir para a sacola?`,
      () => location.href = '/carrinho'
    );
  }
}