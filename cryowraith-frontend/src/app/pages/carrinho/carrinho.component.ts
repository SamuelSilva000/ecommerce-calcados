import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CarrinhoService, ItemCarrinho } from '../../services/carrinho.service';
import { ProdutoService } from '../../services/produto.service';
import { AuthService } from '../../services/auth.service';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-carrinho',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.css']
})
export class CarrinhoComponent implements OnInit {
  itens: ItemCarrinho[] = [];
  subtotal = 0;
  quantidade = 0;

  constructor(
    public carrinhoService: CarrinhoService,
    private authService: AuthService,
    private modalService: ModalService,
    private produtoService: ProdutoService
  ) {}

  ngOnInit(): void {
    this.carrinhoService.itens$.subscribe(itens => {
      this.itens = itens;
      this.subtotal = itens.reduce((s, i) => s + i.preco * i.qtd, 0);
      this.quantidade = itens.reduce((s, i) => s + i.qtd, 0);
    });
  }

  aumentar(index: number): void {
    const item = this.itens[index];
    const nomeBase = item.nome.split(' (Tam')[0];
    this.produtoService.buscarPorNome(nomeBase).subscribe(produto => {
      if (produto && item.qtd >= produto.estoque) {
        this.modalService.alerta('Estoque máximo: ' + produto.estoque + ' unidades');
      } else {
        this.carrinhoService.alterarQtd(index, item.qtd + 1);
      }
    });
  }

  diminuir(index: number): void {
    const item = this.itens[index];
    if (item.qtd > 1) {
      this.carrinhoService.alterarQtd(index, item.qtd - 1);
    } else {
      this.carrinhoService.remover(index);
    }
  }

  remover(index: number): void {
    this.carrinhoService.remover(index);
  }

  finalizar(): void {
    if (this.itens.length === 0) {
      this.modalService.alerta('Carrinho vazio');
      return;
    }
    if (!this.authService.usuarioAtual) {
      this.modalService.alerta('Faça login para continuar');
      this.authService.abrirModalLogin();
      return;
    }
    location.href = '/checkout';
  }
}