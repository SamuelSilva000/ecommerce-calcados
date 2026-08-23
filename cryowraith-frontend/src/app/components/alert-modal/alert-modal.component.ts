import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-alert-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './alert-modal.component.html',
  styleUrls: ['./alert-modal.component.css']
})
export class AlertModalComponent {
  visivel = false;
  mensagem = '';
  mostrarInput = false;
  inputPlaceholder = '';
  valorInput = '';
  callbackOk: (() => void) | null = null;
  callbackCancelar: (() => void) | null = null;
  textoOk = 'OK';
  textoCancelar = 'Cancelar';
  mostrarCancelar = false;

  constructor(private modalService: ModalService) {
    this.modalService.registrar(this);
  }

  abrirAlerta(msg: string, cb?: () => void): void {
    this.mensagem = msg;
    this.mostrarInput = false;
    this.callbackOk = cb || null;
    this.mostrarCancelar = false;
    this.textoOk = 'OK';
    this.visivel = true;
  }

  abrirConfirmacao(msg: string, cbOk: () => void, cbCancelar?: () => void): void {
    this.mensagem = msg;
    this.mostrarInput = false;
    this.callbackOk = cbOk;
    this.callbackCancelar = cbCancelar || null;
    this.mostrarCancelar = true;
    this.textoOk = 'Sim';
    this.textoCancelar = 'Não';
    this.visivel = true;
  }

  abrirComInput(msg: string, placeholder: string, cbOk: (valor: string) => void): void {
    this.mensagem = msg;
    this.mostrarInput = true;
    this.inputPlaceholder = placeholder;
    this.valorInput = '';
    this.callbackOk = () => cbOk(this.valorInput);
    this.mostrarCancelar = true;
    this.textoOk = 'OK';
    this.textoCancelar = 'Cancelar';
    this.visivel = true;
  }

  ok(): void {
    this.visivel = false;
    if (this.callbackOk) this.callbackOk();
  }

  cancelar(): void {
    this.visivel = false;
    if (this.callbackCancelar) this.callbackCancelar();
  }

  fechar(): void {
    this.visivel = false;
  }
}