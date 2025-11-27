import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavComponent } from '../components/nav.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NavComponent, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule],
  template: `<app-nav></app-nav><main class="container fade-in"><h1>Contact</h1><p class="lead">Portfolio project for Frontend Developer Intern role at RePut.ai</p><mat-card class="form-card fade-in-up"><h2>Send a Message</h2><p class="muted">Demo form with validation</p><form [formGroup]="contactForm" (ngSubmit)="onSubmit()"><mat-form-field appearance="outline"><mat-label>Name</mat-label><input matInput formControlName="name" required><mat-icon matPrefix>person</mat-icon><mat-error *ngIf="contactForm.get('name')?.hasError('required')">Name is required</mat-error></mat-form-field><mat-form-field appearance="outline"><mat-label>Email</mat-label><input matInput type="email" formControlName="email" required><mat-icon matPrefix>email</mat-icon><mat-error *ngIf="contactForm.get('email')?.hasError('required')">Email is required</mat-error><mat-error *ngIf="contactForm.get('email')?.hasError('email')">Invalid email</mat-error></mat-form-field><mat-form-field appearance="outline"><mat-label>Message</mat-label><textarea matInput formControlName="message" rows="4" required></textarea><mat-error *ngIf="contactForm.get('message')?.hasError('required')">Message is required</mat-error></mat-form-field><div class="form-actions"><button mat-flat-button color="primary" type="submit" [disabled]="contactForm.invalid || submitted"><mat-icon>send</mat-icon>{{ submitted ? 'Sent!' : 'Send' }}</button><button mat-stroked-button type="button" (click)="resetForm()"><mat-icon>refresh</mat-icon>Reset</button></div><p *ngIf="submitted" class="success"><mat-icon>check_circle</mat-icon>Message received (demo mode)</p></form></mat-card></main>`,
  styles: [`h1{font-size:2.5rem;margin-bottom:0.5rem}.lead{font-size:1.125rem;color:var(--text-secondary);margin-bottom:2rem}.form-card{padding:2rem;max-width:600px;margin:0 auto}.form-card h2{margin:0 0 0.5rem 0}form{display:flex;flex-direction:column;gap:1rem;margin-top:1.5rem}.form-actions{display:flex;gap:1rem}.success{display:flex;align-items:center;gap:0.5rem;color:var(--success);font-weight:600;margin-top:1rem;padding:1rem;background:rgba(16,185,129,0.1);border-radius:var(--radius)}`]
})
export class ContactComponent {
  contactForm: FormGroup;
  submitted = false;
  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }
  onSubmit(): void {
    if (this.contactForm.valid) {
      this.submitted = true;
      setTimeout(() => {
        this.submitted = false;
        this.contactForm.reset();
      }, 3000);
    }
  }
  resetForm(): void {
    this.contactForm.reset();
    this.submitted = false;
  }
}
