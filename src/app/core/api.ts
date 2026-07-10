import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// URL base de tu backend Spring Boot
export const API_URL = 'http://localhost:8080';

// Endpoints definidos
export const ENDPOINTS = {
  login: `${API_URL}/auth/login`,
  registro: `${API_URL}/auth/register`,
  clientes: `${API_URL}/clientes`,
  reservas: `${API_URL}/reservas`,
  usuarios: `${API_URL}/usuarios`,
  viajes: `${API_URL}/viajes`
};

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  // --- CLIENTES ---
  getClientes(): Observable<any> {
    return this.http.get(ENDPOINTS.clientes);
  }

  createCliente(cliente: any): Observable<any> {
    return this.http.post(ENDPOINTS.clientes, cliente);
  }

  deleteCliente(id: number | string): Observable<any> {
    return this.http.delete(`${ENDPOINTS.clientes}/${id}`);
  }

  // --- RESERVAS ---
  getReservas(): Observable<any> {
    return this.http.get(ENDPOINTS.reservas);
  }

  createReserva(reserva: any): Observable<any> {
    return this.http.post(ENDPOINTS.reservas, reserva);
  }

  deleteReserva(id: number | string): Observable<any> {
    return this.http.delete(`${ENDPOINTS.reservas}/${id}`);
  }

  // --- USUARIOS ---
  getUsuarios(): Observable<any> {
    return this.http.get(ENDPOINTS.usuarios);
  }

  createUsuario(usuario: any): Observable<any> {
    return this.http.post(ENDPOINTS.usuarios, usuario);
  }

  deleteUsuario(id: number | string): Observable<any> {
    return this.http.delete(`${ENDPOINTS.usuarios}/${id}`);
  }

  // --- VIAJES ---
  getViajes(): Observable<any> {
    return this.http.get(ENDPOINTS.viajes);
  }

  createViaje(viaje: any): Observable<any> {
    return this.http.post(ENDPOINTS.viajes, viaje);
  }

  deleteViaje(id: number | string): Observable<any> {
    return this.http.delete(`${ENDPOINTS.viajes}/${id}`);
  }
}