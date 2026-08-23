import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-contato',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css']
})
export class ContatoComponent {
  nome = '';
  email = '';
  assunto = '';
  mensagem = '';

  constructor(private modalService: ModalService) {}

  enviar(): void {
    if (!this.nome || !this.email || !this.assunto || !this.mensagem) {
      this.modalService.alerta('Preencha todos os campos!');
      return;
    }
    if (!this.email.includes('@') || !this.email.includes('.')) {
      this.modalService.alerta('E-mail inválido!');
      return;
    }
    this.modalService.alerta('Mensagem enviada! Responderemos em breve.');
    this.nome = '';
    this.email = '';
    this.assunto = '';
    this.mensagem = '';
  }
}