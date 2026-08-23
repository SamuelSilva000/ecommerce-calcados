import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProdutoService, Produto } from '../../services/produto.service';
import { CarrinhoService } from '../../services/carrinho.service';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  produtos: Produto[] = [];
  destaques: Produto[] = [];
  filtro = 'Todos';
  tipos: string[] = ['Todos'];

  constructor(
    private produtoService: ProdutoService,
    private carrinhoService: CarrinhoService,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.produtoService.listar().subscribe({
      next: (p) => {
        this.produtos = p;
        this.destaques = p.filter(x => x.destaque);
        this.tipos = ['Todos', ...new Set(p.map(x => x.tipo))];
      }
    });
  }

  filtrar(tipo: string): void {
    this.filtro = tipo;
  }

  get filtrados(): Produto[] {
    if (this.filtro === 'Todos') return this.destaques;
    return this.destaques.filter(p => p.tipo === this.filtro);
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