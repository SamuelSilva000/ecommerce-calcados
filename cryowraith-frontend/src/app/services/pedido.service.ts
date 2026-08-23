import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Pedido {
  id?: number;
  userEmail: string;
  itens: any[];
  total: number;
  frete: number;
  status: string;
  data: string;
  endereco: string;
  pagamento: string;
}

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  constructor(private http: HttpClient) {}

  listar(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>('/api/pedidos');
  }

  listarPorUsuario(email: string): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(`/api/pedidos/usuario/${email}`);
  }

  criar(pedido: Pedido): Observable<Pedido> {
    return this.http.post<Pedido>('/api/pedidos', pedido);
  }

  atualizarStatus(id: number, status: string): Observable<Pedido> {
    return this.http.put<Pedido>(`/api/pedidos/${id}/status`, { status });
  }

  cancelar(id: number): Observable<void> {
    return this.http.delete<void>(`/api/pedidos/${id}`);
  }
}