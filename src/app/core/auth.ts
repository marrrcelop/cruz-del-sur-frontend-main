import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, switchMap, tap, throwError } from 'rxjs';
import { ENDPOINTS } from './api';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly tokenKey = 'token';
  private readonly roleKey = 'rol';

  constructor(private http: HttpClient) { }

  login(credentials: any): Observable<string> {
    return this.http.post(ENDPOINTS.login, credentials, {
      responseType: 'text'
    }).pipe(
      tap(token => {
        localStorage.setItem(this.tokenKey, token);
        localStorage.removeItem(this.roleKey);
      }),
      switchMap(token => {
        if (!this.isJwt(token)) {
          this.logout();
          return throwError(() => new Error('Credenciales invalidas'));
        }

        return this.http.get<any[]>(ENDPOINTS.usuarios).pipe(
          tap(usuarios => {
            const username = String(credentials?.username ?? '').toLowerCase();
            const usuario = usuarios.find(u => String(u.correo ?? '').toLowerCase() === username);

            if (usuario?.rol) {
              localStorage.setItem(this.roleKey, usuario.rol);
            }
          }),
          map(() => token)
        );
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.roleKey);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getRole(): string | null {
    return localStorage.getItem(this.roleKey);
  }

  isAuthenticated(): boolean {
    return this.getToken() !== null;
  }

  hasRole(allowedRoles: string[]): boolean {
    const currentRole = this.normalizeRole(this.getRole());

    return allowedRoles.some(role => {
      const allowedRole = this.normalizeRole(role);
      return currentRole === allowedRole || (allowedRole === 'ADMIN' && currentRole === 'ADMINISTRADOR');
    });
  }

  isAdmin(): boolean {
    return this.hasRole(['ADMIN']);
  }

  private normalizeRole(role: string | null): string {
    return String(role ?? '').trim().toUpperCase();
  }

  private isJwt(token: string): boolean {
    return token.split('.').length === 3;
  }
}
