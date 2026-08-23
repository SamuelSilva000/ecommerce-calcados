import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CarrinhoService } from '../../services/carrinho.service';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-detalhes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './detalhes.component.html',
  styleUrls: ['./detalhes.component.css']
})
export class DetalhesComponent implements OnInit {
  produto: any = null;
  tamanhoSelecionado = '';
  quantidade = 1;
  tamanhos = ['37', '38', '39', '40', '41', '42', '43'];

  constructor(
    private carrinhoService: CarrinhoService,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    const d = localStorage.getItem('produtoDetalhe');
    if (d) this.produto = JSON.parse(d);
  }

  selecionarTamanho(t: string): void {
    this.tamanhoSelecionado = t;
  }

  adicionar(): void {
    if (!this.produto) {
      this.modalService.alerta('Produto não encontrado');
      return;
    }
    if (!this.tamanhoSelecionado) {
      this.modalService.alerta('Selecione um tamanho');
      return;
    }
    if (this.quantidade < 1) {
      this.modalService.alerta('Quantidade inválida');
      return;
    }
    if (this.quantidade > this.produto.estoque) {
      this.modalService.alerta('Estoque insuficiente! Disponível: ' + this.produto.estoque);
      return;
    }

    const nomeCompleto = this.produto.nome + ' (Tam ' + this.tamanhoSelecionado + ')';
    this.carrinhoService.adicionar({
      nome: nomeCompleto,
      preco: this.produto.preco,
      qtd: this.quantidade,
      img: this.produto.imagem,
      tamanho: this.tamanhoSelecionado
    });

    this.modalService.confirmar(
      `${this.quantidade}x ${this.produto.nome} (Tam ${this.tamanhoSelecionado}) adicionado! Ir para o carrinho?`,
      () => location.href = '/carrinho'
    );
  }
}