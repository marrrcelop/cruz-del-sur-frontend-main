import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../core/api';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reservas',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  template: `
    <nav class="navbar">
      <h2>Panel Cruz del Sur</h2>
      <button (click)="volver()" class="btn-success">Volver al Menu</button>
    </nav>
    <div class="container">
      <h3>Gestion de Reservas</h3>

      <form [formGroup]="reservaForm" (ngSubmit)="onSubmit()" class="form-card">
        <div class="grid-2">
          <div class="form-group">
            <label>ID Cliente</label>
            <input type="number" formControlName="clienteId" class="form-control" [class.invalid]="isInvalid('clienteId')">
            <div *ngIf="isInvalid('clienteId')" class="error">{{ getError('clienteId') }}</div>
          </div>
          <div class="form-group">
            <label>ID Viaje</label>
            <input type="number" formControlName="viajeId" class="form-control" [class.invalid]="isInvalid('viajeId')">
            <div *ngIf="isInvalid('viajeId')" class="error">{{ getError('viajeId') }}</div>
          </div>
          <div class="form-group">
            <label>Numero de Asiento</label>
            <input type="number" formControlName="numero_asiento" class="form-control" [class.invalid]="isInvalid('numero_asiento')">
            <div *ngIf="isInvalid('numero_asiento')" class="error">{{ getError('numero_asiento') }}</div>
          </div>
          <div class="form-group">
            <label>Metodo de Pago</label>
            <select formControlName="metodo_pago" class="form-control" [class.invalid]="isInvalid('metodo_pago')">
              <option value="Tarjeta">Tarjeta</option>
              <option value="Efectivo">Efectivo</option>
            </select>
            <div *ngIf="isInvalid('metodo_pago')" class="error">{{ getError('metodo_pago') }}</div>
          </div>
        </div>
        <button type="submit" [disabled]="reservaForm.invalid" class="btn-primary">Registrar Reserva</button>
      </form>

      <div class="table-responsive">
        <table>
          <thead>
            <tr>
              <th>ID Reserva</th>
              <th>Asiento</th>
              <th>Metodo de Pago</th>
              <th>Estado Pago</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let r of reservas">
              <td>{{ r.id_reserva }}</td>
              <td>{{ r.numero_asiento }}</td>
              <td>{{ r.metodo_pago }}</td>
              <td>{{ r.estado_pago || 'Pendiente' }}</td>
              <td>
                <button (click)="eliminar(r.id_reserva)" class="btn-danger-small">Eliminar</button>
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
    .container { padding: 0 2rem; max-width: 1200px; margin: auto; font-family: Arial, sans-serif; }
    h3 { color: #333; }
    .form-card { background: white; padding: 1.5rem; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); margin-bottom: 2rem; }
    .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
    .form-group { margin-bottom: 1rem; }
    .form-group label { display: block; margin-bottom: 0.5rem; font-weight: bold; color: #555; }
    .form-control { width: 100%; padding: 0.6rem; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box; }
    .form-control.invalid { border-color: #dc3545; background: #fff8f8; }
    .error { color: #dc3545; font-size: 0.85rem; margin-top: 0.35rem; }
    .btn-primary { padding: 0.6rem 1.2rem; background-color: #0056b3; color: white; border: none; border-radius: 4px; cursor: pointer; margin-top: 0.5rem; }
    .btn-primary:disabled { background-color: #a0c4e8; cursor: not-allowed; }
    .btn-success { padding: 0.5rem 1rem; background-color: #28a745; color: white; border: none; border-radius: 4px; cursor: pointer; }
    .btn-danger-small { padding: 0.4rem 0.8rem; background-color: #dc3545; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 0.85rem;}
    .table-responsive { overflow-x: auto; background: white; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
    table { width: 100%; border-collapse: collapse; }
    th, td { padding: 1rem; text-align: left; border-bottom: 1px solid #eee; }
    th { background-color: #f8f9fa; }
  `]
})
export class ReservasComponent implements OnInit {
  private fb = inject(FormBuilder);
  private apiService = inject(ApiService);
  private router = inject(Router);

  reservas: any[] = [];

  reservaForm = this.fb.group({
    clienteId: ['', [Validators.required, Validators.min(1)]],
    viajeId: ['', [Validators.required, Validators.min(1)]],
    numero_asiento: ['', [Validators.required, Validators.min(1), Validators.max(60)]],
    metodo_pago: ['Tarjeta', Validators.required]
  });

  ngOnInit() { this.cargarReservas(); }

  cargarReservas() {
    this.apiService.getReservas().subscribe(data => this.reservas = data);
  }

  onSubmit() {
    if (this.reservaForm.invalid) {
      this.reservaForm.markAllAsTouched();
      return;
    }

    const payload = {
      cliente: { id_cliente: this.reservaForm.value.clienteId },
      viaje: { id_viaje: this.reservaForm.value.viajeId },
      numero_asiento: this.reservaForm.value.numero_asiento,
      metodo_pago: this.reservaForm.value.metodo_pago,
      estado_pago: 'Confirmado',
      estado_reserva: 'Activa'
    };

    this.apiService.createReserva(payload).subscribe(() => {
      this.cargarReservas();
      this.reservaForm.reset({ metodo_pago: 'Tarjeta' });
    });
  }

  eliminar(id: number) {
    if (confirm('Eliminar reserva?')) {
      this.apiService.deleteReserva(id).subscribe(() => this.cargarReservas());
    }
  }

  volver() {
    this.router.navigate(['/home']);
  }

  isInvalid(controlName: string): boolean {
    const control = this.reservaForm.get(controlName);
    return !!control && control.invalid && (control.dirty || control.touched);
  }

  getError(controlName: string): string {
    const errors = this.reservaForm.get(controlName)?.errors;

    if (!errors) return '';
    if (errors['required']) return 'Este campo es obligatorio.';
    if (errors['min']) return `Debe ser mayor o igual a ${errors['min'].min}.`;
    if (errors['max']) return `Debe ser menor o igual a ${errors['max'].max}.`;

    return 'Dato invalido.';
  }
}
