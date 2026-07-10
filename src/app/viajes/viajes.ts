import { Component, OnInit, inject } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { ApiService } from '../core/api';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-viajes',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  template: `
    <nav class="navbar">
      <h2>Panel Cruz del Sur</h2>
      <button (click)="volver()" class="btn-success">Volver al Menu</button>
    </nav>
    <div class="container">
      <h3>Gestion de Viajes</h3>

      <form [formGroup]="viajeForm" (ngSubmit)="onSubmit()" class="form-card">
        <div class="grid-2">
          <div class="form-group">
            <label>Origen</label>
            <input formControlName="origen" class="form-control" [class.invalid]="isInvalid('origen')" placeholder="Ej. Lima">
            <div *ngIf="isInvalid('origen')" class="error">{{ getError('origen') }}</div>
          </div>
          <div class="form-group">
            <label>Destino</label>
            <input formControlName="destino" class="form-control" [class.invalid]="isInvalid('destino') || isSameRoute()" placeholder="Ej. Arequipa">
            <div *ngIf="isInvalid('destino')" class="error">{{ getError('destino') }}</div>
            <div *ngIf="isSameRoute()" class="error">El origen y destino no pueden ser iguales.</div>
          </div>
          <div class="form-group">
            <label>Fecha</label>
            <input type="date" formControlName="fecha" class="form-control" [class.invalid]="isInvalid('fecha')">
            <div *ngIf="isInvalid('fecha')" class="error">{{ getError('fecha') }}</div>
          </div>
          <div class="form-group">
            <label>Hora</label>
            <input type="time" formControlName="hora" class="form-control" [class.invalid]="isInvalid('hora')">
            <div *ngIf="isInvalid('hora')" class="error">{{ getError('hora') }}</div>
          </div>
          <div class="form-group">
            <label>Tipo de Servicio</label>
            <select formControlName="tipo_servicio" class="form-control" [class.invalid]="isInvalid('tipo_servicio')">
              <option value="VIP">VIP</option>
              <option value="Economico">Economico</option>
            </select>
            <div *ngIf="isInvalid('tipo_servicio')" class="error">{{ getError('tipo_servicio') }}</div>
          </div>
          <div class="form-group">
            <label>Precio (S/)</label>
            <input type="number" formControlName="precio" class="form-control" [class.invalid]="isInvalid('precio')" placeholder="0.00">
            <div *ngIf="isInvalid('precio')" class="error">{{ getError('precio') }}</div>
          </div>
        </div>
        <button type="submit" [disabled]="viajeForm.invalid" class="btn-primary">Guardar Viaje</button>
      </form>

      <div class="table-responsive">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Ruta (Origen - Destino)</th>
              <th>Fecha y Hora</th>
              <th>Servicio</th>
              <th>Precio</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let v of viajes">
              <td>{{ v.id_viaje }}</td>
              <td>{{ v.origen }} - {{ v.destino }}</td>
              <td>{{ v.fecha | date }} {{ v.hora }}</td>
              <td>{{ v.tipo_servicio }}</td>
              <td>S/ {{ v.precio }}</td>
              <td>
                <button (click)="eliminar(v.id_viaje)" class="btn-danger-small">Eliminar</button>
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
export class ViajesComponent implements OnInit {
  private fb = inject(FormBuilder);
  private apiService = inject(ApiService);
  private router = inject(Router);

  viajes: any[] = [];

  viajeForm = this.fb.group({
    origen: ['', [Validators.required, Validators.minLength(2), Validators.pattern(/^[A-Za-zÀ-ÿ\s]+$/)]],
    destino: ['', [Validators.required, Validators.minLength(2), Validators.pattern(/^[A-Za-zÀ-ÿ\s]+$/)]],
    fecha: ['', [Validators.required, this.fechaNoPasadaValidator]],
    hora: ['', Validators.required],
    tipo_servicio: ['VIP', Validators.required],
    precio: [0, [Validators.required, Validators.min(1)]]
  }, { validators: this.rutaDiferenteValidator });

  ngOnInit() { this.cargarViajes(); }

  cargarViajes() {
    this.apiService.getViajes().subscribe(data => this.viajes = data);
  }

  onSubmit() {
    if (this.viajeForm.invalid) {
      this.viajeForm.markAllAsTouched();
      return;
    }

    this.apiService.createViaje(this.viajeForm.value).subscribe(() => {
      this.cargarViajes();
      this.viajeForm.reset({ tipo_servicio: 'VIP', precio: 0 });
    });
  }

  eliminar(id: number) {
    if (confirm('Eliminar viaje?')) {
      this.apiService.deleteViaje(id).subscribe(() => this.cargarViajes());
    }
  }

  volver() {
    this.router.navigate(['/home']);
  }

  isInvalid(controlName: string): boolean {
    const control = this.viajeForm.get(controlName);
    return !!control && control.invalid && (control.dirty || control.touched);
  }

  isSameRoute(): boolean {
    const origen = this.viajeForm.get('origen');
    const destino = this.viajeForm.get('destino');
    return !!this.viajeForm.errors?.['sameRoute'] && !!(origen?.dirty || origen?.touched || destino?.dirty || destino?.touched);
  }

  getError(controlName: string): string {
    const errors = this.viajeForm.get(controlName)?.errors;

    if (!errors) return '';
    if (errors['required']) return 'Este campo es obligatorio.';
    if (errors['minlength']) return `Debe tener al menos ${errors['minlength'].requiredLength} caracteres.`;
    if (errors['min']) return `Debe ser mayor o igual a ${errors['min'].min}.`;
    if (errors['pastDate']) return 'La fecha no puede ser anterior a hoy.';
    if (errors['pattern']) return 'Solo se permiten letras y espacios.';

    return 'Dato invalido.';
  }

  private rutaDiferenteValidator(control: AbstractControl): ValidationErrors | null {
    const origen = String(control.get('origen')?.value ?? '').trim().toLowerCase();
    const destino = String(control.get('destino')?.value ?? '').trim().toLowerCase();

    return origen && destino && origen === destino ? { sameRoute: true } : null;
  }

  private fechaNoPasadaValidator(control: AbstractControl): ValidationErrors | null {
    if (!control.value) return null;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const selectedDate = new Date(`${control.value}T00:00:00`);
    return selectedDate < today ? { pastDate: true } : null;
  }
}
