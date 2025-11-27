import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from '../components/nav.component';
import { ApiService, Supplier } from '../services/api.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SupplierFormDialog } from '../components/supplier-form.dialog';

@Component({
  selector: 'app-suppliers',
  standalone: true,
  imports: [CommonModule, NavComponent, MatDialogModule, MatButtonModule, MatIconModule, SupplierFormDialog],
  template: `
    <app-nav></app-nav>
    <main class="container">
      <h2>Suppliers</h2>
      <p class="muted">Filter and inspect supplier sustainability ratings</p>

      <div class="row" style="align-items:center">
        <div class="col">
          <input placeholder="Search by name or location" (input)="onSearch($event)" />
        </div>
        <div style="display:flex;align-items:center;gap:.5rem">
          <button mat-flat-button color="primary" (click)="openAdd()">Add Supplier</button>
        </div>
      </div>

      <div class="list" style="margin-top:1rem">
        <article *ngFor="let s of filtered" class="card" style="margin-bottom:0.75rem">
          <div style="display:flex;justify-content:space-between;align-items:center">
            <div>
              <h4>{{ s.name }}</h4>
              <div class="muted">{{ s.location }} • {{ s.certifications?.join(', ') || 'No certifications' }}</div>
            </div>
            <div style="text-align:right;display:flex;gap:.5rem;align-items:center">
              <div style="font-weight:700">{{ s.rating }}%</div>
              <button mat-icon-button (click)="openEdit(s)" aria-label="Edit"><mat-icon>edit</mat-icon></button>
              <button mat-icon-button color="warn" (click)="delete(s)" aria-label="Delete"><mat-icon>delete</mat-icon></button>
            </div>
          </div>
        </article>
      </div>

      <div class="card" style="margin-top:1rem">
        <h3>Supplier locations</h3>
        <div id="suppliers-map" style="height:300px;border-radius:8px;overflow:hidden"></div>
      </div>
    </main>
  `
})
export class SuppliersComponent implements OnInit {
  suppliers: Supplier[] = [];
  filtered: Supplier[] = [];
  searchTerm = '';

  constructor(private api: ApiService, private dialog: MatDialog) {}

  ngOnInit() {
    this.api.getSuppliers().subscribe((s) => {
      this.suppliers = s;
      this.filtered = s;
      // initialize map when suppliers are loaded
      setTimeout(() => this.initMap(), 100);
    });
  }

  inspect(s: Supplier) {
    alert(`Open supplier details: ${s.name} — rating ${s.rating}%`);
  }

  openAdd() {
    const ref = this.dialog.open(SupplierFormDialog, { data: null });
    ref.afterClosed().subscribe((res: any) => {
      if (res) {
        const newSupplier: Supplier = {
          id: `s${Date.now()}`,
          name: res.name,
          location: res.location,
          lat: res.lat ? Number(res.lat) : undefined,
          lng: res.lng ? Number(res.lng) : undefined,
          rating: res.rating ? Number(res.rating) : 0,
          certifications: res.certifications ? res.certifications.split(',').map((c: any) => c.trim()) : []
        };
        this.suppliers.push(newSupplier);
        this.filtered = [...this.suppliers];
        // refresh map markers
        this.initMap();
      }
    });
  }

  openEdit(s: Supplier) {
    const ref = this.dialog.open(SupplierFormDialog, { data: { ...s, certifications: (s.certifications || []).join(', ') } });
    ref.afterClosed().subscribe((res: any) => {
      if (res) {
        const idx = this.suppliers.findIndex(x => x.id === s.id);
        if (idx >= 0) {
          this.suppliers[idx] = {
            ...this.suppliers[idx],
            name: res.name,
            location: res.location,
            lat: res.lat ? Number(res.lat) : undefined,
            lng: res.lng ? Number(res.lng) : undefined,
            rating: res.rating ? Number(res.rating) : 0,
            certifications: res.certifications ? res.certifications.split(',').map((c: any) => c.trim()) : []
          };
          this.filtered = [...this.suppliers];
          this.initMap();
        }
      }
    });
  }

  delete(s: Supplier) {
    if (!confirm(`Delete supplier ${s.name}?`)) return;
    this.suppliers = this.suppliers.filter(x => x.id !== s.id);
    this.filtered = [...this.suppliers];
    this.initMap();
  }

  onSearch(e: Event) {
    const text = (e.target as HTMLInputElement).value?.toLowerCase() || '';
    this.searchTerm = text;
    this.filtered = this.suppliers.filter((s) => s.name.toLowerCase().includes(text) || s.location.toLowerCase().includes(text));
  }

  private mapInstance: any | undefined;

  private async initMap() {
    try {
      const L: any = await import('leaflet');
      const el = document.getElementById('suppliers-map');
      if (!el) return;
      // if previously created map, remove it first to re-draw with new markers
      if (this.mapInstance) {
        try { this.mapInstance.remove(); } catch { /* noop */ }
      }
      const map = L.map(el).setView([20.0, 75.0], 3);
      this.mapInstance = map;
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap'
      }).addTo(map);

      (this.suppliers || []).forEach(s => {
        if (s.lat && s.lng) {
          L.marker([s.lat, s.lng]).addTo(map).bindPopup(`<strong>${s.name}</strong><br/>${s.location}<br/>Rating: ${s.rating}%`);
        }
      });
    } catch (err) {
      // ignore if leaflet not available
      console.warn('Leaflet failed to initialize', err);
    }
  }
}
