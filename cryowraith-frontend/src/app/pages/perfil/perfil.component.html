<section class="pf">
  <h1 class="tt">Meu Perfil</h1>

  <div class="sc">
    <h2>Meus Dados</h2>
    <div class="fg">
      <label>Nome</label>
      <input [(ngModel)]="nome" placeholder="Seu nome">
    </div>
    <div class="fg">
      <label>E-mail</label>
      <input [(ngModel)]="email" readonly style="background:#F3F4F6">
    </div>
    <div class="fg">
      <label>Nova senha (opcional)</label>
      <input [(ngModel)]="senha" type="password" placeholder="••••••••">
    </div>
    <button class="bs" (click)="salvar()">Salvar Alterações</button>
    <button class="bo" (click)="logout()">Sair da Conta</button>
  </div>

  <div class="sc">
    <h2>Meus Pedidos</h2>
    <div *ngIf="pedidos.length === 0" class="vz">Nenhum pedido ainda</div>
    <div *ngFor="let p of pedidos; let i = index" class="pi">
      <strong>Pedido #{{ p.id || (i+1) }}</strong>
      <p>Total: R$ {{ p.total.toFixed(2) }} + frete R$ {{ p.frete.toFixed(2) }}</p>
      <p>Endereço: {{ p.endereco || '—' }}</p>
      <p>Data: {{ p.data | date:'dd/MM/yyyy' }}</p>
      <p class="st" [ngClass]="{'ep': p.status === 'Em preparação', 'ev': p.status === 'Em rota de envio', 'er': p.status === 'Entregue'}">Status: {{ p.status }}</p>
      <p>Itens: {{ getItensTexto(p.itens) }}</p>
      <button *ngIf="p.status !== 'Entregue'" class="bc" (click)="cancelarPedido(i)">Cancelar Pedido</button>
    </div>
  </div>
</section>