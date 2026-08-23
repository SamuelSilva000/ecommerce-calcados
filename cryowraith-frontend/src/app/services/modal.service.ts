import { Injectable } from '@angular/core';
import { AlertModalComponent } from '../components/alert-modal/alert-modal.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private alertComponent: AlertModalComponent | null = null;

  registrar(component: AlertModalComponent): void {
    this.alertComponent = component;
  }

  alerta(msg: string, cb?: () => void): void {
    this.alertComponent?.abrirAlerta(msg, cb);
  }

  confirmar(msg: string, cbOk: () => void, cbCancelar?: () => void): void {
    this.alertComponent?.abrirConfirmacao(msg, cbOk, cbCancelar);
  }

  input(msg: string, placeholder: string, cbOk: (valor: string) => void): void {
    this.alertComponent?.abrirComInput(msg, placeholder, cbOk);
  }
}