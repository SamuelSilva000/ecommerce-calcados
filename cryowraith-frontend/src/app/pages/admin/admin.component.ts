import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProdutoService, Produto } from '../../services/produto.service';
import { PedidoService, Pedido } from '../../services/pedido.service';
import { AuthService } from '../../services/auth.service';
import { ModalService } from '../../services/modal.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  aba: 'produtos' | 'usuarios' | 'pedidos' = 'produtos';
  produtos: Produto[] = [];
  usuarios: any[] = [];
  pedidos: Pedido[] = [];
  modalProduto = false;
  editando: Produto | null = null;
  pdNome = '';
  pdPreco = 0;
  pdDesc = '';
  pdImg = 'calcado1.jpg';
  pdEstoque = 0;
  pdTipo = '';

  constructor(
    private produtoService: ProdutoService,
    private pedidoService: PedidoService,
    private authService: AuthService,
    private modalService: ModalService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    if (this.authService.usuarioAtual?.role !== 'admin') {
      location.href = '/';
      return;
    }
    this.carregarProdutos();
  }

  carregarProdutos(): void {
    this.produtoService.listar().subscribe(p => this.produtos = p);
  }

  carregarUsuarios(): void {
    this.http.get<any[]>('/api/auth/usuarios').subscribe(u => this.usuarios = u);
  }

  carregarPedidos(): void {
    this.pedidoService.listar().subscribe(p => this.pedidos = p);
  }

  trocarAba(aba: 'produtos' | 'usuarios' | 'pedidos'): void {
    this.aba = aba;
    if (aba === 'usuarios') this.carregarUsuarios();
    if (aba === 'pedidos') this.carregarPedidos();
  }

  abrirNovo(): void {
    this.editando = null;
    this.pdNome = '';
    this.pdPreco = 0;
    this.pdDesc = '';
    this.pdImg = 'calcado1.jpg';
    this.pdEstoque = 0;
    this.pdTipo = '';
    this.modalProduto = true;
  }

  editar(p: Produto): void {
    this.editando = p;
    this.pdNome = p.nome;
    this.pdPreco = p.preco;
    this.pdDesc = p.descricao;
    this.pdImg = p.imagem.replace('/imagens/', '');
    this.pdEstoque = p.estoque;
    this.pdTipo = p.tipo;
    this.modalProduto = true;
  }

  salvarProduto(): void {
    if (!this.pdNome || this.pdPreco <= 0) {
      this.modalService.alerta('Nome e preço são obrigatórios!');
      return;
    }
    const p: Produto = {
      id: this.editando ? this.editando.id : 0,
      nome: this.pdNome,
      preco: this.pdPreco,
      descricao: this.pdDesc || 'Novo calçado',
      imagem: '/imagens/' + this.pdImg,
      estoque: this.pdEstoque,
      tipo: this.pdTipo || 'Outro',
      destaque: this.editando ? this.editando.destaque : false
    };

    this.produtoService.salvar(p).subscribe({
      next: () => {
        this.modalProduto = false;
        this.carregarProdutos();
        this.modalService.alerta('Produto salvo!');
      },
      error: () => this.modalService.alerta('Erro ao salvar')
    });
  }

  removerProduto(nome: string): void {
    this.modalService.confirmar('Remover ' + nome + '?', () => {
      this.produtoService.remover(nome).subscribe({
        next: () => {
          this.carregarProdutos();
          this.modalService.alerta('Removido!');
        },
        error: () => this.modalService.alerta('Erro ao remover')
      });
    });
  }

  atualizarStatus(pedido: Pedido, event: Event): void {
    const status = (event.target as HTMLSelectElement).value;
    this.pedidoService.atualizarStatus(pedido.id!, status).subscribe({
      next: () => this.carregarPedidos(),
      error: () => this.modalService.alerta('Erro ao atualizar')
    });
  }

  logout(): void {
    this.modalService.confirmar('Sair do painel?', () => {
      this.authService.logout();
      location.href = '/';
    });
  }

  getItensTexto(itens: any[]): string {
    if (typeof itens === 'string') {
      try { itens = JSON.parse(itens); } catch(e) { return ''; }
    }
    return itens.map((i: any) => i.qtd + 'x ' + i.nome).join(', ');
  }
}