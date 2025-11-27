import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

export interface SupplierFormData {
  id?: string;
  name: string;
  location: string;
  lat?: number;
  lng?: number;
  rating?: number;
  certifications?: string;
}

@Component({
  selector: 'app-supplier-form-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  template: `
    <h2 mat-dialog-title>{{ data?.id ? 'Edit' : 'Add' }} Supplier</h2>
    <form [formGroup]="form" (ngSubmit)="save()" style="padding:0 24px 24px;display:flex;flex-direction:column;gap:10px;min-width:280px">
      <mat-form-field appearance="fill"><input matInput placeholder="Name" formControlName="name" required /></mat-form-field>
      <mat-form-field appearance="fill"><input matInput placeholder="Location" formControlName="location" required /></mat-form-field>
      <div style="display:flex;gap:8px">
        <mat-form-field appearance="fill" style="flex:1"><input matInput type="number" placeholder="Latitude" formControlName="lat" /></mat-form-field>
        <mat-form-field appearance="fill" style="flex:1"><input matInput type="number" placeholder="Longitude" formControlName="lng" /></mat-form-field>
      </div>
      <mat-form-field appearance="fill"><input matInput type="number" placeholder="Rating (0-100)" formControlName="rating" /></mat-form-field>
      <mat-form-field appearance="fill"><input matInput placeholder="Certifications (comma separated)" formControlName="certifications" /></mat-form-field>

      <div style="display:flex;gap:8px;justify-content:flex-end;margin-top:8px">
        <button mat-stroked-button type="button" (click)="cancel()">Cancel</button>
        <button mat-flat-button color="primary" type="submit" [disabled]="form.invalid">Save</button>
      </div>
    </form>
  `
})
export class SupplierFormDialog {
  form!: FormGroup;

  constructor(private dialogRef: MatDialogRef<SupplierFormDialog>, @Inject(MAT_DIALOG_DATA) public data: SupplierFormData | null, private fb: FormBuilder) {
    // Initialize the form inside the constructor so fb and data are available
    this.form = this.fb.group({
      id: [this.data?.id ?? null],
      name: [this.data?.name ?? '', Validators.required],
      location: [this.data?.location ?? '', Validators.required],
      lat: [this.data?.lat ?? null],
      lng: [this.data?.lng ?? null],
      rating: [this.data?.rating ?? null],
      certifications: [this.data?.certifications ?? '']
    });
  }

  save() {
    if (this.form.valid) {
      const value = this.form.value;
      // convert certifications string to array in caller
      this.dialogRef.close(value);
    }
  }

  cancel() {
    this.dialogRef.close(null);
  }
}
