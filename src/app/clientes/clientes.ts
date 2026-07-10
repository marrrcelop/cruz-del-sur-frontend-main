import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../core/api';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  template: `
    <nav class="navbar">
      <h2>Panel Cruz del Sur</h2>
      <button (click)="volver()" class="btn-success">Volver al Menu</button>
    </nav>
    <div class="container">
      <h3>Gestion de Clientes</h3>

      <form [formGroup]="clienteForm" (ngSubmit)="onSubmit()" class="form-card">
        <div class="grid-2">
          <div class="form-group">
            <label>Nombres</label>
            <input formControlName="nombres" class="form-control" [class.invalid]="isInvalid('nombres')" placeholder="Ej. Juan">
            <div *ngIf="isInvalid('nombres')" class="error">{{ getError('nombres') }}</div>
          </div>
          <div class="form-group">
            <label>Apellidos</label>
            <input formControlName="apellidos" class="form-control" [class.invalid]="isInvalid('apellidos')" placeholder="Ej. Perez">
            <div *ngIf="isInvalid('apellidos')" class="error">{{ getError('apellidos') }}</div>
          </div>
          <div class="form-group">
            <label>Correo</label>
            <input formControlName="correo" type="email" class="form-control" [class.invalid]="isInvalid('correo')" placeholder="juan@email.com">
            <div *ngIf="isInvalid('correo')" class="error">{{ getError('correo') }}</div>
          </div>
          <div class="form-group">
            <label>Documento</label>
            <input formControlName="documento" class="form-control" [class.invalid]="isInvalid('documento')" placeholder="DNI o Carnet">
            <div *ngIf="isInvalid('documento')" class="error">{{ getError('documento') }}</div>
          </div>
        </div>
        <button type="submit" [disabled]="clienteForm.invalid" class="btn-primary">Guardar Cliente</button>
      </form>

      <div class="table-responsive">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Documento</th>
              <th>Nombres</th>
              <th>Apellidos</th>
              <th>Correo</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let cliente of clientes">
              <td>{{ cliente.id_cliente }}</td>
              <td>{{ cliente.documento }}</td>
              <td>{{ cliente.nombres }}</td>
              <td>{{ cliente.apellidos }}</td>
              <td>{{ cliente.correo }}</td>
              <td>
                <button (click)="eliminar(cliente.id_cliente)" class="btn-danger-small">Eliminar</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: [`
    body { margin: 0; font-family: Arial, sans-serif; background-color: #f4f7f6;}
    .navbar { display: flex; justify-content: space-between; align-items: center; padding: 1rem 2rem; background: #0056b3; color: white; margin-bottom: 2rem;}
    .navbar h2 { margin: 0; }
    .container { padding: 0 2rem; max-width: 1200px; margin: auto; }
    h3 { color: #333; }
    .form-card { background: white; padding: 1.5rem; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); margin-bottom: 2rem; }
    .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
    .form-group { margin-bottom: 1rem; }
    .form-group label { display: block; margin-bottom: 0.5rem; font-weight: bold; color: #555; }
    .form-control { width: 100%; padding: 0.6rem; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box; }
    .form-control.invalid { border-color: #dc3545; background: #fff8f8; }
    .error { color: #dc3545; font-size: 0.85rem; margin-top: 0.35rem; }
    .btn-primary { padding: 0.6rem 1.2rem; background-color: #0056b3; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 1rem; margin-top: 0.5rem; }
    .btn-primary:disabled { background-color: #a0c4e8; cursor: not-allowed; }
    .btn-success { padding: 0.5rem 1rem; background-color: #28a745; color: white; border: none; border-radius: 4px; cursor: pointer; }
    .btn-danger-small { padding: 0.4rem 0.8rem; background-color: #dc3545; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 0.85rem;}
    .table-responsive { overflow-x: auto; background: white; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
    table { width: 100%; border-collapse: collapse; }
    th, td { padding: 1rem; text-align: left; border-bottom: 1px solid #eee; }
    th { background-color: #f8f9fa; color: #333; font-weight: bold; }
  `]
})
export class ClientesComponent implements OnInit {
  private fb = inject(FormBuilder);
  private apiService = inject(ApiService);
  private router = inject(Router);

  clientes: any[] = [];

  clienteForm = this.fb.group({
    nombres: ['', [Validators.required, Validators.minLength(2), Validators.pattern(/^[A-Za-zÀ-ÿ\s]+$/)]],
    apellidos: ['', [Validators.required, Validators.minLength(2), Validators.pattern(/^[A-Za-zÀ-ÿ\s]+$/)]],
    correo: ['', [Validators.required, Validators.email]],
    documento: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(12), Validators.pattern(/^[0-9A-Za-z]+$/)]]
  });

  ngOnInit() { this.cargarClientes(); }

  cargarClientes() {
    this.apiService.getClientes().subscribe(data => this.clientes = data);
  }

  onSubmit() {
    if (this.clienteForm.invalid) {
      this.clienteForm.markAllAsTouched();
      return;
    }

    this.apiService.createCliente(this.clienteForm.value).subscribe(() => {
      this.cargarClientes();
      this.clienteForm.reset();
    });
  }

  eliminar(id: number) {
    if (confirm('Estas seguro de eliminar este cliente?')) {
      this.apiService.deleteCliente(id).subscribe(() => this.cargarClientes());
    }
  }

  volver() {
    this.router.navigate(['/home']);
  }

  isInvalid(controlName: string): boolean {
    const control = this.clienteForm.get(controlName);
    return !!control && control.invalid && (control.dirty || control.touched);
  }

  getError(controlName: string): string {
    const errors = this.clienteForm.get(controlName)?.errors;

    if (!errors) return '';
    if (errors['required']) return 'Este campo es obligatorio.';
    if (errors['email']) return 'Ingresa un correo valido.';
    if (errors['minlength']) return `Debe tener al menos ${errors['minlength'].requiredLength} caracteres.`;
    if (errors['maxlength']) return `Debe tener maximo ${errors['maxlength'].requiredLength} caracteres.`;
    if (errors['pattern'] && controlName === 'documento') return 'Solo se permiten letras y numeros.';
    if (errors['pattern']) return 'Solo se permiten letras y espacios.';

    return 'Dato invalido.';
  }
}
