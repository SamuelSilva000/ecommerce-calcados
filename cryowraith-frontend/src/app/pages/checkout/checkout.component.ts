import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CarrinhoService, ItemCarrinho } from '../../services/carrinho.service';
import { PedidoService } from '../../services/pedido.service';
import { AuthService } from '../../services/auth.service';
import { ModalService } from '../../services/modal.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  itens: ItemCarrinho[] = [];
  subtotal = 0;
  frete = 0;
  total = 0;
  pagamento = 'credito';
  cep = '';
  endereco = '';
  numero = '';
  bairro = '';
  cidade = '';
  uf = '';
  complemento = '';
  nomeCartao = '';
  numCartao = '';
  validade = '';
  cvv = '';
  freteInfo = '';

  constructor(
    private carrinhoService: CarrinhoService,
    private pedidoService: PedidoService,
    private authService: AuthService,
    private modalService: ModalService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.itens = this.carrinhoService.getItens();
    this.subtotal = this.carrinhoService.total();
    this.total = this.subtotal;
    if (this.itens.length === 0) {
      location.href = '/carrinho';
    }
  }

  buscarCep(): void {
    const c = this.cep.replace(/\D/g, '');
    if (c.length !== 8) {
      this.modalService.alerta('CEP inválido');
      return;
    }
    this.http.get<any>(`https://viacep.com.br/ws/${c}/json/`).subscribe({
      next: (d) => {
        if (d.erro) {
          this.modalService.alerta('CEP não encontrado');
          return;
        }
        this.endereco = d.logradouro || '';
        this.bairro = d.bairro || '';
        this.cidade = d.localidade || '';
        this.uf = d.uf || '';
        this.calcularFrete(d.uf);
      },
      error: () => this.modalService.alerta('Erro ao buscar CEP')
    });
  }

  calcularFrete(uf: string): void {
    const tabela: any = { SP: 15, RJ: 15, MG: 15, ES: 15, PR: 22, SC: 22, RS: 22, GO: 32, DF: 32, MT: 32, MS: 32, BA: 45, SE: 45, AL: 45, PE: 45, PB: 45, RN: 45, CE: 45, PI: 45, MA: 45, AC: 58, AM: 58, AP: 58, PA: 58, RO: 58, RR: 58, TO: 58 };
    this.frete = tabela[uf.toUpperCase()] || 58;
    this.total = this.subtotal + this.frete;
    this.freteInfo = `Frete: R$ ${this.frete.toFixed(2)}`;
  }

  confirmar(): void {
    if (!this.cep || !this.endereco || !this.numero || !this.bairro || !this.cidade || !this.uf) {
      this.modalService.alerta('Preencha o endereço completo');
      return;
    }
    if ((this.pagamento === 'credito' || this.pagamento === 'debito') && (!this.nomeCartao || !this.numCartao || !this.validade || !this.cvv)) {
      this.modalService.alerta('Preencha os dados do cartão');
      return;
    }

    const user = this.authService.usuarioAtual;
    const pedido = {
      userEmail: user?.email || '',
      itens: JSON.stringify(this.itens),
      total: this.total,
      frete: this.frete,
      status: 'Em preparação',
      data: new Date().toISOString(),
      endereco: `${this.endereco}, ${this.numero} - ${this.bairro}, ${this.cidade}/${this.uf}`,
      pagamento: this.pagamento
    };

    this.pedidoService.criar(pedido as any).subscribe({
      next: () => {
        this.carrinhoService.limpar();
        this.modalService.alerta('Pedido confirmado! Obrigado pela compra.', () => {
          location.href = '/';
        });
      },
      error: () => this.modalService.alerta('Erro ao confirmar pedido')
    });
  }
}