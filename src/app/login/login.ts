import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../core/auth';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  template: `
    <div class="login-container">
      <div class="login-card">
        <h2>Cruz del Sur</h2>
        <p>Inicia sesión para continuar</p>
        <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
          
          <div class="form-group">
            <label>Correo (Username)</label>
            <input type="text" formControlName="username" class="form-control" placeholder="admin@cruzdelsur.pe">
            <div *ngIf="loginForm.get('username')?.invalid && loginForm.get('username')?.touched" class="error">
              El correo es requerido.
            </div>
          </div>

          <div class="form-group">
            <label>Contraseña</label>
            <input type="password" formControlName="password" class="form-control" placeholder="******">
            <div *ngIf="loginForm.get('password')?.invalid && loginForm.get('password')?.touched" class="error">
              La contraseña es requerida.
            </div>
          </div>

          <div *ngIf="errorMessage" class="error api-error">{{ errorMessage }}</div>

          <button type="submit" [disabled]="loginForm.invalid" class="btn-primary">Ingresar</button>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .login-container { display: flex; justify-content: center; align-items: center; height: 100vh; background-color: #f4f7f6; font-family: Arial, sans-serif; }
    .login-card { background: white; padding: 2.5rem; border-radius: 10px; box-shadow: 0 10px 15px rgba(0,0,0,0.1); width: 100%; max-width: 400px; }
    h2 { margin-top: 0; color: #0056b3; }
    p { color: #666; margin-bottom: 1.5rem; }
    .form-group { margin-bottom: 1rem; }
    .form-control { width: 100%; padding: 0.75rem; border: 1px solid #ccc; border-radius: 6px; box-sizing: border-box; }
    .btn-primary { width: 100%; padding: 0.75rem; background-color: #0056b3; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 1rem; margin-top: 1rem; }
    .btn-primary:disabled { background-color: #a0c4e8; cursor: not-allowed; }
    .error { color: #dc3545; font-size: 0.85rem; margin-top: 0.4rem; }
    .api-error { text-align: center; font-weight: bold; }
  `]
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  errorMessage = '';

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: () => {
          this.errorMessage = '';

          // 👉 AQUÍ REDIRECCIÓN
          this.router.navigate(['/home']); // o la ruta que tengas
        },
        error: (error) => {
          this.errorMessage = error?.message === 'Credenciales invalidas'
            ? 'Credenciales invalidas.'
            : 'Error al conectar con el servidor.';
        }
      });
    }
  }
}
