import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../core/auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  template: `
    <nav class="navbar">
      <h2>Cruz del Sur - Panel Principal</h2>
      <button (click)="logout()" class="btn-danger">Cerrar Sesión</button>
    </nav>
    <div class="container">
      <h3>Bienvenido al Sistema</h3>
      <p>Selecciona el módulo al que deseas acceder:</p>
      
      <div class="grid">
        <div class="card" (click)="go('/clientes')">
          <div class="icon">👥</div>
          <h4>Clientes</h4>
          <p>Gestionar pasajeros</p>
        </div>
        
        <div class="card" (click)="go('/viajes')">
          <div class="icon">🚌</div>
          <h4>Viajes</h4>
          <p>Rutas y horarios</p>
        </div>
        
        <div class="card" (click)="go('/reservas')">
          <div class="icon">🎟️</div>
          <h4>Reservas</h4>
          <p>Boletos y pagos</p>
        </div>
        
        <div class="card" *ngIf="isAdmin()" (click)="go('/usuarios')">
          <div class="icon">⚙️</div>
          <h4>Usuarios</h4>
          <p>Administradores</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    body { margin: 0; font-family: Arial, sans-serif; background-color: #f4f7f6; }
    .navbar { display: flex; justify-content: space-between; align-items: center; padding: 1rem 2rem; background: #0056b3; color: white; }
    .navbar h2 { margin: 0; }
    .container { padding: 3rem 2rem; max-width: 1000px; margin: auto; text-align: center; }
    h3 { color: #333; font-size: 2rem; margin-bottom: 0.5rem; }
    p { color: #666; font-size: 1.1rem; }
    .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5rem; margin-top: 3rem; }
    .card { background: white; padding: 2rem; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); cursor: pointer; transition: transform 0.2s, box-shadow 0.2s; }
    .card:hover { transform: translateY(-5px); box-shadow: 0 8px 15px rgba(0,0,0,0.1); border-bottom: 4px solid #0056b3; }
    .icon { font-size: 3rem; margin-bottom: 1rem; }
    .card h4 { margin: 0 0 0.5rem 0; color: #0056b3; font-size: 1.3rem; }
    .btn-danger { padding: 0.5rem 1rem; background-color: #dc3545; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 1rem; }
  `]
})
export class HomeComponent {
  private router = inject(Router);
  private authService = inject(AuthService);

  go(ruta: string) {
    this.router.navigate([ruta]);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  isAdmin(): boolean {
    return this.authService.isAdmin();
  }
}
