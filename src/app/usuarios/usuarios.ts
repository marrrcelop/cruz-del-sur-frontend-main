import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../core/api';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  template: `
    <div class="container">
      <div class="header">
        <h3>Gestion de Usuarios Administrativos</h3>
        <button type="button" (click)="volverAlMenu()" class="btn-secondary">Volver al menu</button>
      </div>

      <form [formGroup]="usuarioForm" (ngSubmit)="onSubmit()" class="form-card">
        <div class="grid-2">
          <div class="form-group">
            <label>Nombres</label>
            <input formControlName="nombres" class="form-control" [class.invalid]="isInvalid('nombres')" placeholder="Ej. Admin">
            <div *ngIf="isInvalid('nombres')" class="error">{{ getError('nombres') }}</div>
          </div>
          <div class="form-group">
            <label>Correo</label>
            <input type="email" formControlName="correo" class="form-control" [class.invalid]="isInvalid('correo')" placeholder="admin@cruzdelsur.pe">
            <div *ngIf="isInvalid('correo')" class="error">{{ getError('correo') }}</div>
          </div>
          <div class="form-group">
            <label>Contrasena</label>
            <input type="password" formControlName="contrasena_hash" class="form-control" [class.invalid]="isInvalid('contrasena_hash')" placeholder="******">
            <div *ngIf="isInvalid('contrasena_hash')" class="error">{{ getError('contrasena_hash') }}</div>
          </div>
          <div class="form-group">
            <label>Rol</label>
            <select formControlName="rol" class="form-control" [class.invalid]="isInvalid('rol')">
              <option value="ADMIN">ADMIN</option>
              <option value="AGENTE">AGENTE</option>
            </select>
            <div *ngIf="isInvalid('rol')" class="error">{{ getError('rol') }}</div>
          </div>
        </div>
        <button type="submit" [disabled]="usuarioForm.invalid" class="btn-success">Guardar Usuario</button>
      </form>

      <div class="table-responsive">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombres</th>
              <th>Correo</th>
              <th>Rol</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let u of usuarios">
              <td>{{ u.id_usuario }}</td>
              <td>{{ u.nombres }}</td>
              <td>{{ u.correo }}</td>
              <td>{{ u.rol }}</td>
              <td>
                <button (click)="eliminar(u.id_usuario)" class="btn-danger-small">Eliminar</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: [`
    .container { padding: 0 2rem; max-width: 1200px; margin: auto; font-family: Arial, sans-serif; }
    .header { display: flex; justify-content: space-between; align-items: center; gap: 1rem; margin-bottom: 1rem; }
    h3 { color: #333; }
    .form-card { background: white; padding: 1.5rem; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); margin-bottom: 2rem; }
    .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
    .form-group { margin-bottom: 1rem; }
    .form-group label { display: block; margin-bottom: 0.5rem; font-weight: bold; color: #555; }
    .form-control { width: 100%; padding: 0.6rem; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box; }
    .form-control.invalid { border-color: #dc3545; background: #fff8f8; }
    .error { color: #dc3545; font-size: 0.85rem; margin-top: 0.35rem; }
    .btn-success { padding: 0.6rem 1.2rem; background-color: #28a745; color: white; border: none; border-radius: 4px; cursor: pointer; margin-top: 0.5rem; }
    .btn-success:disabled { background-color: #a5d8b1; cursor: not-allowed; }
    .btn-secondary { padding: 0.55rem 1rem; background-color: #6c757d; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 0.95rem; white-space: nowrap; }
    .btn-secondary:hover { background-color: #5c636a; }
    .btn-danger-small { padding: 0.4rem 0.8rem; background-color: #dc3545; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 0.85rem;}
    .table-responsive { overflow-x: auto; background: white; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
    table { width: 100%; border-collapse: collapse; }
    th, td { padding: 1rem; text-align: left; border-bottom: 1px solid #eee; }
    th { background-color: #f8f9fa; }
    @media (max-width: 640px) {
      .header { align-items: stretch; flex-direction: column; }
      .btn-secondary { width: 100%; }
    }
  `]
})
export class UsuariosComponent implements OnInit {
  private fb = inject(FormBuilder);
  private apiService = inject(ApiService);
  private router = inject(Router);

  usuarios: any[] = [];

  usuarioForm = this.fb.group({
    nombres: ['', [Validators.required, Validators.minLength(2), Validators.pattern(/^[A-Za-zÀ-ÿ\s]+$/)]],
    correo: ['', [Validators.required, Validators.email]],
    contrasena_hash: ['', [Validators.required, Validators.minLength(6)]],
    rol: ['ADMIN', [Validators.required, Validators.pattern(/^(ADMIN|AGENTE)$/)]]
  });

  ngOnInit() { this.cargarUsuarios(); }

  cargarUsuarios() {
    this.apiService.getUsuarios().subscribe(data => this.usuarios = data);
  }

  onSubmit() {
    if (this.usuarioForm.invalid) {
      this.usuarioForm.markAllAsTouched();
      return;
    }

    this.apiService.createUsuario(this.usuarioForm.value).subscribe(() => {
      this.cargarUsuarios();
      this.usuarioForm.reset({ rol: 'ADMIN' });
    });
  }

  eliminar(id: number) {
    if (confirm('Eliminar usuario?')) {
      this.apiService.deleteUsuario(id).subscribe(() => this.cargarUsuarios());
    }
  }

  volverAlMenu() {
    this.router.navigate(['/home']);
  }

  isInvalid(controlName: string): boolean {
    const control = this.usuarioForm.get(controlName);
    return !!control && control.invalid && (control.dirty || control.touched);
  }

  getError(controlName: string): string {
    const errors = this.usuarioForm.get(controlName)?.errors;

    if (!errors) return '';
    if (errors['required']) return 'Este campo es obligatorio.';
    if (errors['email']) return 'Ingresa un correo valido.';
    if (errors['minlength']) return `Debe tener al menos ${errors['minlength'].requiredLength} caracteres.`;
    if (errors['pattern'] && controlName === 'rol') return 'El rol debe ser ADMIN o AGENTE.';
    if (errors['pattern']) return 'Solo se permiten letras y espacios.';

    return 'Dato invalido.';
  }
}
