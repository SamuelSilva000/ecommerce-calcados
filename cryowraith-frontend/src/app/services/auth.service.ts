import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface Usuario {
  nome: string;
  email: string;
  role: string;
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly usuarioSubject = new BehaviorSubject<Usuario | null>(this.carregarUsuario());
  usuario$ = this.usuarioSubject.asObservable();
  
  private modalLoginAberto = false;

  constructor(private readonly http: HttpClient) {}

  private carregarUsuario(): Usuario | null {
    const u = localStorage.getItem('usuario');
    return u ? JSON.parse(u) : null;
  }

  private salvarUsuario(u: Usuario | null): void {
    if (u) {
      localStorage.setItem('usuario', JSON.stringify(u));
    } else {
      localStorage.removeItem('usuario');
    }
    this.usuarioSubject.next(u);
  }

  login(email: string, senha: string): Promise<boolean> {
    return new Promise((resolve) => {
      this.http.post<Usuario>('/api/auth/login', { email, senha }).subscribe({
        next: (u) => {
          this.salvarUsuario(u);
          this.fecharModalLogin();
          resolve(true);
        },
        error: () => resolve(false)
      });
    });
  }

  registro(nome: string, email: string, senha: string): Promise<string> {
    return new Promise((resolve) => {
      this.http.post('/api/auth/registro', { nome, email, senha }).subscribe({
        next: () => {
          resolve('ok');
        },
        error: (err) => {
          resolve(err.error?.message || 'Erro ao registrar');
        }
      });
    });
  }

  logout(): void {
    this.salvarUsuario(null);
  }

  abrirModalLogin(): void {
    this.modalLoginAberto = true;
  }

  fecharModalLogin(): void {
    this.modalLoginAberto = false;
  }

  get modalAberto(): boolean {
    return this.modalLoginAberto;
  }

  get usuarioAtual(): Usuario | null {
    return this.usuarioSubject.value;
  }
}