import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  logado = false;
  isAdmin = false;

  constructor(public authService: AuthService) {}

  ngOnInit(): void {
    this.authService.usuario$.subscribe(u => {
      this.logado = !!u;
      this.isAdmin = u?.role === 'admin';
    });
  }

  irParaPerfil(): void {
    if (this.isAdmin) {
      location.href = '/admin';
    } else {
      location.href = '/perfil';
    }
  }

  abrirLogin(): void {
    this.authService.abrirModalLogin();
  }

  logout(): void {
    this.authService.logout();
    location.href = '/';
  }
}