import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Produto {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  estoque: number;
  tipo: string;
  imagem: string;
  destaque: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  constructor(private http: HttpClient) {}

  listar(): Observable<Produto[]> {
    return this.http.get<Produto[]>('/api/produtos');
  }

  buscarPorNome(nome: string): Observable<Produto> {
    return this.http.get<Produto>(`/api/produtos/${encodeURIComponent(nome)}`);
  }

  salvar(produto: Produto): Observable<Produto> {
    return this.http.post<Produto>('/api/produtos', produto);
  }

  remover(nome: string): Observable<void> {
    return this.http.delete<void>(`/api/produtos/${encodeURIComponent(nome)}`);
  }
}