import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { PedidoService, Pedido } from '../../services/pedido.service';
import { ModalService } from '../../services/modal.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  nome = '';
  email = '';
  senha = '';
  pedidos: Pedido[] = [];

  constructor(
    private authService: AuthService,
    private pedidoService: PedidoService,
    private modalService: ModalService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    const u = this.authService.usuarioAtual;
    if (!u) {
      location.href = '/';
      return;
    }
    this.email = u.email;
    this.nome = u.nome;
    this.carregarPedidos();
  }

  carregarPedidos(): void {
    this.pedidoService.listarPorUsuario(this.email).subscribe(p => this.pedidos = p);
  }

  salvar(): void {
    if (!this.nome) {
      this.modalService.alerta('Nome obrigatório');
      return;
    }
    this.http.put('/api/auth/perfil', { nome: this.nome, email: this.email, senha: this.senha || undefined }).subscribe({
      next: () => this.modalService.alerta('Dados salvos!'),
      error: () => this.modalService.alerta('Erro ao salvar')
    });
  }

  cancelarPedido(index: number): void {
    const p = this.pedidos[index];
    if (p.status === 'Entregue') {
      this.modalService.alerta('Pedido entregue não pode ser cancelado');
      return;
    }
    this.modalService.confirmar('Cancelar pedido?', () => {
      this.pedidoService.cancelar(p.id!).subscribe({
        next: () => {
          this.modalService.alerta('Cancelado!');
          this.carregarPedidos();
        },
        error: () => this.modalService.alerta('Erro ao cancelar')
      });
    });
  }

  logout(): void {
    this.modalService.confirmar('Sair da conta?', () => {
      this.authService.logout();
      location.href = '/';
    });
  }

  getItensTexto(itens: any[]): string {
    return itens.map(i => i.qtd + 'x ' + i.nome).join(', ');
  }
}