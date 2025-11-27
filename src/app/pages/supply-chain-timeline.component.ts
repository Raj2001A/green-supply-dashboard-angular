import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from '../components/nav.component';
import { LoadingComponent } from '../components/loading.component';
import { ApiService } from '../services/api.service';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';

/**
 * Supply Chain Timeline - Interactive emissions tracking
 * Demonstrates: Data visualization, filtering, animations
 */
@Component({
  selector: 'app-supply-chain-timeline',
  standalone: true,
  imports: [CommonModule, NavComponent, LoadingComponent, MatCardModule, MatIconModule, MatChipsModule],
  template: `
    <app-nav></app-nav>
    <main class="container fade-in">
      <div class="page-header">
        <div>
          <h1><mat-icon>timeline</mat-icon> Supply Chain Timeline</h1>
          <p class="muted">Track emissions across every stage of your product journey</p>
        </div>
      </div>

      <app-loading *ngIf="loading" message="Loading timeline data..."></app-loading>

      <div *ngIf="!loading && events?.length" class="timeline-content">
        <!-- Summary Cards -->
        <div class="summary-cards">
          <mat-card class="summary-card fade-in-up stagger-1">
            <mat-icon class="card-icon">inventory_2</mat-icon>
            <div class="card-content">
              <div class="card-label">Total Stages</div>
              <div class="card-value">{{ events.length }}</div>
            </div>
          </mat-card>

          <mat-card class="summary-card fade-in-up stagger-2">
            <mat-icon class="card-icon success">eco</mat-icon>
            <div class="card-content">
              <div class="card-label">Total Emissions</div>
              <div class="card-value">{{ totalEmissions }} kg</div>
            </div>
          </mat-card>

          <mat-card class="summary-card fade-in-up stagger-3">
            <mat-icon class="card-icon warning">warning</mat-icon>
            <div class="card-content">
              <div class="card-label">High Impact Stages</div>
              <div class="card-value">{{ highImpactCount }}</div>
            </div>
          </mat-card>
        </div>

        <!-- Timeline -->
        <mat-card class="timeline-card">
          <div class="timeline-header">
            <h2>Emission Stages</h2>
            <div class="legend">
              <mat-chip class="chip-low">Low (&lt;100 kg)</mat-chip>
              <mat-chip class="chip-medium">Medium (100-300 kg)</mat-chip>
              <mat-chip class="chip-high">High (&gt;300 kg)</mat-chip>
            </div>
          </div>

          <div class="timeline">
            <div *ngFor="let e of events; let i = index; let last = last"
                 class="timeline-item fade-in-up"
                 [style.animation-delay]="(i * 100) + 'ms'"
                 [class.high]="e.emissionsKg > 300"
                 [class.medium]="e.emissionsKg <= 300 && e.emissionsKg > 100"
                 [class.low]="e.emissionsKg <= 100">

              <div class="timeline-marker">
                <div class="marker-dot"></div>
                <div *ngIf="!last" class="marker-line"></div>
              </div>

              <div class="timeline-content">
                <div class="timeline-badge">
                  <mat-icon>{{ getStageIcon(e.stage) }}</mat-icon>
                </div>
                <div class="timeline-details">
                  <h3>{{ e.stage }}</h3>
                  <div class="timeline-meta">
                    <span class="meta-item">
                      <mat-icon>location_on</mat-icon>
                      {{ e.location }}
                    </span>
                    <span class="meta-item">
                      <mat-icon>calendar_today</mat-icon>
                      {{ e.timestamp | date:'mediumDate' }}
                    </span>
                    <span class="meta-item emissions" [class.high]="e.emissionsKg > 300">
                      <mat-icon>cloud</mat-icon>
                      {{ e.emissionsKg }} kg CO₂
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </mat-card>
      </div>

      <div *ngIf="!loading && !events?.length" class="empty-state">
        <mat-icon>timeline</mat-icon>
        <h3>No Timeline Data</h3>
        <p>No emission events found for this project.</p>
      </div>
    </main>
  `,
  styles: [`
    .page-header {
      margin-bottom: 2rem;
    }
    .page-header h1 {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin: 0 0 0.5rem 0;
      font-size: 2rem;
    }
    .timeline-content {
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }
    .summary-cards {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1.5rem;
    }
    .summary-card {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1.5rem;
      transition: all 300ms ease;
    }
    .summary-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 12px 30px rgba(0, 0, 0, 0.1) !important;
    }
    .card-icon {
      font-size: 40px;
      width: 40px;
      height: 40px;
      color: var(--primary);
    }
    .card-icon.success { color: var(--success); }
    .card-icon.warning { color: var(--warning); }
    .card-label {
      font-size: 0.875rem;
      color: var(--text-secondary);
      margin-bottom: 0.25rem;
    }
    .card-value {
      font-size: 1.75rem;
      font-weight: 700;
      color: var(--text-primary);
    }
    .timeline-card {
      padding: 2rem;
    }
    .timeline-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
      flex-wrap: wrap;
      gap: 1rem;
    }
    .timeline-header h2 {
      margin: 0;
    }
    .legend {
      display: flex;
      gap: 0.5rem;
      flex-wrap: wrap;
    }
    .chip-low {
      background: rgba(16, 185, 129, 0.1) !important;
      color: var(--success) !important;
    }
    .chip-medium {
      background: rgba(245, 158, 11, 0.1) !important;
      color: var(--warning) !important;
    }
    .chip-high {
      background: rgba(239, 68, 68, 0.1) !important;
      color: var(--danger) !important;
    }
    .timeline {
      position: relative;
    }
    .timeline-item {
      display: flex;
      gap: 1.5rem;
      position: relative;
    }
    .timeline-marker {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      flex-shrink: 0;
    }
    .marker-dot {
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background: var(--primary);
      border: 3px solid var(--card-bg);
      box-shadow: 0 0 0 3px var(--primary);
      z-index: 1;
    }
    .timeline-item.high .marker-dot {
      background: var(--danger);
      box-shadow: 0 0 0 3px var(--danger);
    }
    .timeline-item.medium .marker-dot {
      background: var(--warning);
      box-shadow: 0 0 0 3px var(--warning);
    }
    .marker-line {
      width: 2px;
      flex: 1;
      background: linear-gradient(to bottom, var(--primary), var(--border-light));
      margin-top: 0.5rem;
    }
    .timeline-content {
      flex: 1;
      display: flex;
      gap: 1rem;
      padding-bottom: 2rem;
    }
    .timeline-badge {
      width: 48px;
      height: 48px;
      border-radius: var(--radius);
      background: linear-gradient(135deg, var(--primary), var(--secondary));
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    .timeline-badge mat-icon {
      color: white;
      font-size: 24px;
      width: 24px;
      height: 24px;
    }
    .timeline-item.high .timeline-badge {
      background: linear-gradient(135deg, var(--danger), #DC2626);
    }
    .timeline-item.medium .timeline-badge {
      background: linear-gradient(135deg, var(--warning), #D97706);
    }
    .timeline-details {
      flex: 1;
    }
    .timeline-details h3 {
      margin: 0 0 0.75rem 0;
      font-size: 1.125rem;
      color: var(--text-primary);
    }
    .timeline-meta {
      display: flex;
      flex-wrap: wrap;
      gap: 1.5rem;
    }
    .meta-item {
      display: flex;
      align-items: center;
      gap: 0.375rem;
      font-size: 0.875rem;
      color: var(--text-secondary);
    }
    .meta-item mat-icon {
      font-size: 18px;
      width: 18px;
      height: 18px;
      color: var(--text-muted);
    }
    .meta-item.emissions {
      font-weight: 600;
      color: var(--success);
    }
    .meta-item.emissions.high {
      color: var(--danger);
    }
    .empty-state {
      text-align: center;
      padding: 4rem 2rem;
      color: var(--text-secondary);
    }
    .empty-state mat-icon {
      font-size: 64px;
      width: 64px;
      height: 64px;
      color: var(--text-muted);
      margin-bottom: 1rem;
    }
    @media (max-width: 768px) {
      .timeline-header {
        flex-direction: column;
        align-items: flex-start;
      }
      .timeline-meta {
        flex-direction: column;
        gap: 0.5rem;
      }
      .timeline-content {
        gap: 0.75rem;
      }
    }
  `]
})
export class SupplyChainTimelineComponent implements OnInit {
  events: any[] = [];
  loading = false;
  totalEmissions = 0;
  highImpactCount = 0;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.loading = true;
    this.api.getEmissionsForProject('p1').subscribe((list) => {
      this.events = list;
      this.totalEmissions = list.reduce((sum, e) => sum + e.emissionsKg, 0);
      this.highImpactCount = list.filter(e => e.emissionsKg > 300).length;
      this.loading = false;
    });
  }

  getStageIcon(stage: string): string {
    const lowerStage = stage.toLowerCase();
    if (lowerStage.includes('raw') || lowerStage.includes('material')) return 'inventory';
    if (lowerStage.includes('manufacturing') || lowerStage.includes('production')) return 'precision_manufacturing';
    if (lowerStage.includes('transport') || lowerStage.includes('shipping')) return 'local_shipping';
    if (lowerStage.includes('warehouse') || lowerStage.includes('storage')) return 'warehouse';
    if (lowerStage.includes('retail') || lowerStage.includes('distribution')) return 'store';
    return 'category';
  }
}
