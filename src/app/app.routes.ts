import { Routes } from '@angular/router';
import { LoginComponent } from './login/login';
import { HomeComponent } from './home/home'; // <--- Importamos el home
import { ClientesComponent } from './clientes/clientes';
import { ViajesComponent } from './viajes/viajes';
import { ReservasComponent } from './reservas/reservas';
import { UsuariosComponent } from './usuarios/usuarios';
import { authGuard } from './core/auth-guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [authGuard] }, // <--- Agregamos la ruta
  { path: 'clientes', component: ClientesComponent, canActivate: [authGuard] },
  { path: 'viajes', component: ViajesComponent, canActivate: [authGuard] },
  { path: 'reservas', component: ReservasComponent, canActivate: [authGuard] },
  { path: 'usuarios', component: UsuariosComponent, canActivate: [authGuard], data: { roles: ['ADMIN'] } },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];
