import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from '../components/nav.component';
import { LoadingComponent } from '../components/loading.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { ApiService, ProductPassport } from '../services/api.service';
import * as L from 'leaflet';
import QRCode from 'qrcode';

/**
 * Product Passport - Digital product identity with QR and blockchain
 * Demonstrates: External library integration (Leaflet, QRCode), async operations
 */
@Component({
  selector: 'app-product-passport',
  standalone: true,
  imports: [CommonModule, NavComponent, LoadingComponent, MatCardModule, MatIconModule, MatButtonModule, MatChipsModule],
  template: `
    <app-nav></app-nav>
    <main class="container fade-in">
      <div class="page-header">
        <h1><mat-icon>badge</mat-icon> Product Passport</h1>
        <p class="muted">Digital identity with blockchain verification</p>
      </div>

      <app-loading *ngIf="loading" message="Loading product passport..."></app-loading>

      <div *ngIf="!loading && passport" class="passport-content">
        <mat-card class="passport-header fade-in-up">
          <div class="header-content">
            <div class="product-info">
              <h2>{{ passport.productId }}</h2>
              <p class="serial">Serial: {{ passport.serial }}</p>
              <div class="origin">
                <mat-icon>location_on</mat-icon>
                <span>{{ passport.origin.city }}, {{ passport.origin.country }}</span>
              </div>
            </div>
            <div class="score-badge">
              <div class="score-circle" [class.high]="passport.sustainabilityScore >= 80">
                <span class="score-value">{{ passport.sustainabilityScore }}</span>
                <span class="score-label">Score</span>
              </div>
              <p class="score-text">Sustainability Rating</p>
            </div>
          </div>
        </mat-card>

        <div class="passport-grid">
          <mat-card class="info-card fade-in-up stagger-1">
            <h3><mat-icon>inventory</mat-icon> Materials</h3>
            <div class="materials-list">
              <mat-chip *ngFor="let m of passport.materials">{{ m }}</mat-chip>
            </div>
          </mat-card>

          <mat-card class="info-card fade-in-up stagger-2">
            <h3><mat-icon>verified</mat-icon> Certifications</h3>
            <div class="cert-list">
              <div *ngFor="let c of passport.certifications" class="cert-item">
                <mat-icon>check_circle</mat-icon>
                <span>{{ c }}</span>
              </div>
            </div>
          </mat-card>

          <mat-card class="info-card fade-in-up stagger-3">
            <h3><mat-icon>security</mat-icon> Blockchain Status</h3>
            <div class="blockchain-status" [class.verified]="passport.blockchainVerified">
              <mat-icon>{{ passport.blockchainVerified ? 'verified_user' : 'pending' }}</mat-icon>
              <span>{{ passport.blockchainVerified ? 'VERIFIED' : 'PENDING' }}</span>
            </div>
          </mat-card>
        </div>

        <div class="details-grid">
          <mat-card class="map-card fade-in-up">
            <h3><mat-icon>map</mat-icon> Origin Location</h3>
            <div id="passport-map" class="map-container"></div>
          </mat-card>

          <mat-card class="qr-card fade-in-up">
            <h3><mat-icon>qr_code_2</mat-icon> QR Code</h3>
            <div class="qr-container">
              <img *ngIf="qrDataUrl" [src]="qrDataUrl" alt="QR code" class="qr-image" />
              <p class="qr-text">Scan to verify authenticity</p>
              <button mat-flat-button color="primary" (click)="downloadQR()" [disabled]="!qrDataUrl">
                <mat-icon>download</mat-icon>
                Download QR
              </button>
            </div>
          </mat-card>
        </div>
      </div>
    </main>
  `,
  styles: [`
    .page-header { margin-bottom: 2rem; }
    .page-header h1 { display: flex; align-items: center; gap: 0.5rem; margin: 0 0 0.5rem 0; font-size: 2rem; }
    .passport-content { display: flex; flex-direction: column; gap: 2rem; }
    .passport-header { padding: 2rem; }
    .header-content { display: flex; justify-content: space-between; align-items: center; gap: 2rem; flex-wrap: wrap; }
    .product-info h2 { margin: 0 0 0.5rem 0; font-size: 1.75rem; }
    .serial { color: var(--text-secondary); margin: 0 0 1rem 0; }
    .origin { display: flex; align-items: center; gap: 0.5rem; color: var(--text-secondary); }
    .score-badge { text-align: center; }
    .score-circle { width: 100px; height: 100px; border-radius: 50%; background: linear-gradient(135deg, var(--warning), #D97706); display: flex; flex-direction: column; align-items: center; justify-content: center; margin-bottom: 0.5rem; }
    .score-circle.high { background: linear-gradient(135deg, var(--success), #059669); }
    .score-value { font-size: 2rem; font-weight: 700; color: white; }
    .score-label { font-size: 0.75rem; color: rgba(255,255,255,0.9); text-transform: uppercase; }
    .score-text { margin: 0; font-size: 0.875rem; color: var(--text-secondary); }
    .passport-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem; }
    .info-card { padding: 1.5rem; }
    .info-card h3 { display: flex; align-items: center; gap: 0.5rem; margin: 0 0 1rem 0; font-size: 1.125rem; }
    .materials-list { display: flex; flex-wrap: wrap; gap: 0.5rem; }
    .cert-list { display: flex; flex-direction: column; gap: 0.75rem; }
    .cert-item { display: flex; align-items: center; gap: 0.5rem; color: var(--text-secondary); }
    .cert-item mat-icon { color: var(--success); font-size: 20px; width: 20px; height: 20px; }
    .blockchain-status { display: flex; align-items: center; gap: 1rem; padding: 1rem; background: var(--background); border-radius: var(--radius); }
    .blockchain-status mat-icon { font-size: 48px; width: 48px; height: 48px; color: var(--warning); }
    .blockchain-status.verified mat-icon { color: var(--success); }
    .blockchain-status span { font-size: 1.25rem; font-weight: 600; }
    .details-grid { display: grid; grid-template-columns: 2fr 1fr; gap: 2rem; }
    .map-card, .qr-card { padding: 1.5rem; }
    .map-card h3, .qr-card h3 { display: flex; align-items: center; gap: 0.5rem; margin: 0 0 1rem 0; }
    .map-container { height: 300px; border-radius: var(--radius); overflow: hidden; background: var(--background); }
    .qr-container { text-align: center; }
    .qr-image { width: 200px; height: 200px; border-radius: var(--radius); border: 2px solid var(--border-color); margin-bottom: 1rem; }
    .qr-text { margin: 0 0 1rem 0; color: var(--text-secondary); font-size: 0.875rem; }
    @media (max-width: 968px) {
      .header-content { flex-direction: column; align-items: flex-start; }
      .details-grid { grid-template-columns: 1fr; }
    }
  `]
})
export class ProductPassportComponent implements OnInit, AfterViewInit {
  loading = true;
  passport: ProductPassport | null = null;
  qrDataUrl = '';
  private map: any;

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.api.getProductPassport('pp1').subscribe(data => {
      this.passport = data || null;
      if (this.passport) {
        this.generateQR();
      }
      this.loading = false;
      // Initialize map after data is loaded
      setTimeout(() => this.initMap(), 100);
    });
  }

  ngAfterViewInit() {
    // Map will be initialized after data loads in ngOnInit
  }

  initMap() {
    if (!this.passport || !this.passport.origin.lat || !this.passport.origin.lng) return;

    try {
      const { lat, lng } = this.passport.origin;
      this.map = L.map('passport-map').setView([lat, lng], 10);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(this.map);
      L.marker([lat, lng]).addTo(this.map)
        .bindPopup(`<b>${this.passport.origin.city}</b><br>${this.passport.origin.country}`)
        .openPopup();
    } catch (error) {
      console.error('Error initializing map:', error);
    }
  }

  generateQR() {
    if (!this.passport) return;
    const data = JSON.stringify({ serial: this.passport.serial, productId: this.passport.productId });
    QRCode.toDataURL(data, { width: 200, margin: 1 }).then((url: string) => this.qrDataUrl = url);
  }

  downloadQR() {
    const link = document.createElement('a');
    link.href = this.qrDataUrl;
    link.download = `product-${this.passport?.serial}-qr.png`;
    link.click();
  }
}

