import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css']
})
export class LoginModalComponent {
  aba: 'login' | 'registro' = 'login';
  email = '';
  senha = '';
  nome = '';
  confirmarSenha = '';
  mensagemErro = '';

  constructor(public authService: AuthService) {}

  get visivel(): boolean {
    return this.authService.modalAberto;
  }

  fechar(): void {
    this.authService.fecharModalLogin();
    this.mensagemErro = '';
  }

  async fazerLogin(): Promise<void> {
    if (!this.email || !this.senha) {
      this.mensagemErro = 'Preencha todos os campos!';
      return;
    }
    const ok = await this.authService.login(this.email, this.senha);
    if (!ok) {
      this.mensagemErro = 'Email/senha inválidos!';
    }
  }

  async fazerRegistro(): Promise<void> {
    if (!this.nome || !this.email || !this.senha || !this.confirmarSenha) {
      this.mensagemErro = 'Preencha todos os campos!';
      return;
    }
    if (this.senha !== this.confirmarSenha) {
      this.mensagemErro = 'Senhas não conferem!';
      return;
    }
    const result = await this.authService.registro(this.nome, this.email, this.senha);
    if (result === 'ok') {
      this.aba = 'login';
      this.mensagemErro = '';
      await this.fazerLogin();
    } else {
      this.mensagemErro = result;
    }
  }
}