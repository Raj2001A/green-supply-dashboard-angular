import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavComponent } from '../components/nav.component';
import { LoadingComponent } from '../components/loading.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ApiService } from '../services/api.service';

/**
 * Dashboard - Main overview with metrics and recent activity
 * Showcases: Data binding, RxJS, responsive design, animations
 */
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, NavComponent, LoadingComponent, MatCardModule, MatIconModule, MatButtonModule],
  template: `
    <app-nav></app-nav>
    <main class="container fade-in">
      <div class="page-header">
        <div>
          <h1>Dashboard</h1>
          <p class="muted">Supply chain metrics and recent activity</p>
        </div>
        <button mat-flat-button color="primary" routerLink="/timeline">
          <mat-icon>timeline</mat-icon>
          View Timeline
        </button>
      </div>

      <app-loading *ngIf="loading" message="Loading dashboard..."></app-loading>

      <div *ngIf="!loading">
        <div class="cards">
          <mat-card class="card mat-elevation-z2 fade-in-up stagger-1">
            <div class="card-content">
              <mat-icon class="icon primary">inventory_2</mat-icon>
              <div>
                <div class="muted">Active Projects</div>
                <div class="metric">{{ projectsCount }}</div>
              </div>
            </div>
          </mat-card>

          <mat-card class="card mat-elevation-z2 fade-in-up stagger-2">
            <div class="card-content">
              <mat-icon class="icon success">eco</mat-icon>
              <div>
                <div class="muted">Carbon Tracked</div>
                <div class="metric">1,850 kg</div>
              </div>
            </div>
          </mat-card>

          <mat-card class="card mat-elevation-z2 fade-in-up stagger-3">
            <div class="card-content">
              <mat-icon class="icon warning">speed</mat-icon>
              <div>
                <div class="muted">Avg. Latency</div>
                <div class="metric">{{ avgLatency }} ms</div>
              </div>
            </div>
          </mat-card>
        </div>

        <mat-card class="recent-section fade-in-up">
          <div class="section-header">
            <h3><mat-icon>folder</mat-icon> Recent Projects</h3>
            <button mat-stroked-button routerLink="/projects">View All</button>
          </div>
          <div class="projects-list">
            <div *ngFor="let p of recent; let i = index"
                 class="project-item fade-in"
                 [style.animation-delay]="(i * 100) + 'ms'"
                 routerLink="/projects">
              <mat-icon class="project-icon">{{ getIcon(p.stack) }}</mat-icon>
              <div class="project-info">
                <h4>{{ p.name }}</h4>
                <p>{{ p.description }}</p>
              </div>
              <span class="badge badge-primary">{{ p.stack }}</span>
            </div>
          </div>
        </mat-card>
      </div>
    </main>
  `,
  styles: [`
    .page-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 2rem;
      gap: 1rem;
    }
    .page-header h1 { margin: 0 0 0.5rem 0; font-size: 2rem; }
    .cards {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1.5rem;
      margin-bottom: 2rem;
    }
    .card {
      transition: all 300ms ease;
      cursor: default;
    }
    .card:hover {
      transform: translateY(-4px);
      box-shadow: 0 12px 30px rgba(0, 0, 0, 0.1) !important;
    }
    .card-content {
      display: flex;
      align-items: center;
      gap: 1rem;
    }
    .icon {
      font-size: 40px;
      width: 40px;
      height: 40px;
      padding: 0.75rem;
      border-radius: var(--radius);
    }
    .icon.primary { color: var(--primary); background: rgba(0, 168, 107, 0.1); }
    .icon.success { color: var(--success); background: rgba(16, 185, 129, 0.1); }
    .icon.warning { color: var(--warning); background: rgba(245, 158, 11, 0.1); }
    .metric {
      font-size: 2rem;
      font-weight: 700;
      color: var(--text-primary);
      margin-top: 0.25rem;
    }
    .recent-section {
      padding: 1.5rem;
    }
    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;
    }
    .section-header h3 {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin: 0;
    }
    .projects-list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    .project-item {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1rem;
      border-radius: var(--radius);
      background: var(--background);
      transition: all 250ms ease;
      cursor: pointer;
    }
    .project-item:hover {
      background: var(--background-alt);
      transform: translateX(4px);
    }
    .project-icon {
      color: var(--primary);
      font-size: 32px;
      width: 32px;
      height: 32px;
    }
    .project-info {
      flex: 1;
      min-width: 0;
    }
    .project-info h4 {
      margin: 0 0 0.25rem 0;
      font-size: 1rem;
    }
    .project-info p {
      margin: 0;
      font-size: 0.875rem;
      color: var(--text-secondary);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    @media (max-width: 768px) {
      .page-header { flex-direction: column; }
      .cards { grid-template-columns: 1fr; }
      .section-header { flex-direction: column; align-items: flex-start; gap: 1rem; }
    }
  `]
})
export class DashboardComponent implements OnInit {
  loading = true;
  projectsCount = 0;
  avgLatency = 0;
  recent: any[] = [];

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.api.getProjects().subscribe((p) => {
      this.projectsCount = p.length;
      this.recent = p.slice(0, 4);
      this.avgLatency = Math.round(p.reduce((s, x) => s + (x.latency || 100), 0) / p.length);
      this.loading = false;
    });
  }

  getIcon(stack: string): string {
    if (stack.includes('Angular')) return 'web';
    if (stack.includes('Python')) return 'code';
    if (stack.includes('Go')) return 'speed';
    return 'folder';
  }
}
