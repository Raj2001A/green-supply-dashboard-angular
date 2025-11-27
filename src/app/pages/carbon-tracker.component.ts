import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import type { ChartData, ChartOptions, ChartType } from 'chart.js';
import { ApiService } from '../services/api.service';
import { LoadingComponent } from '../components/loading.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NavComponent } from '../components/nav.component';

/**
 * Carbon Footprint Tracker - Emissions visualization
 * Demonstrates: Chart.js integration, data visualization, calculations
 */
@Component({
  selector: 'app-carbon-tracker',
  standalone: true,
  imports: [CommonModule, NavComponent, LoadingComponent, BaseChartDirective, MatCardModule, MatIconModule, MatButtonModule],
  template: `
    <app-nav></app-nav>
    <main class="container fade-in">
      <div class="page-header">
        <div>
          <h1><mat-icon>insights</mat-icon> Carbon Footprint Tracker</h1>
          <p class="muted">Comprehensive emissions analysis and reduction insights</p>
        </div>
      </div>

      <app-loading *ngIf="loading" message="Calculating carbon footprint..."></app-loading>

      <div *ngIf="!loading" class="carbon-content">
        <!-- Summary Cards -->
        <div class="summary-grid">
          <mat-card class="summary-card primary fade-in-up stagger-1">
            <div class="card-icon">
              <mat-icon>cloud</mat-icon>
            </div>
            <div class="card-body">
              <div class="card-label">Total Carbon Footprint</div>
              <div class="card-value">{{ total }} kg</div>
              <div class="card-subtitle">CO₂ equivalent emissions</div>
            </div>
          </mat-card>

          <mat-card class="summary-card success fade-in-up stagger-2">
            <div class="card-icon">
              <mat-icon>trending_down</mat-icon>
            </div>
            <div class="card-body">
              <div class="card-label">Reduction Target</div>
              <div class="card-value">{{ targetPercent }}%</div>
              <div class="card-subtitle">Target by 2025</div>
            </div>
          </mat-card>

          <mat-card class="summary-card warning fade-in-up stagger-3">
            <div class="card-icon">
              <mat-icon>warning</mat-icon>
            </div>
            <div class="card-body">
              <div class="card-label">High Impact Stages</div>
              <div class="card-value">{{ highImpactStages }}</div>
              <div class="card-subtitle">Require optimization</div>
            </div>
          </mat-card>

          <mat-card class="summary-card info fade-in-up stagger-4">
            <div class="card-icon">
              <mat-icon>eco</mat-icon>
            </div>
            <div class="card-body">
              <div class="card-label">Avg per Stage</div>
              <div class="card-value">{{ avgPerStage }} kg</div>
              <div class="card-subtitle">Average emissions</div>
            </div>
          </mat-card>
        </div>

        <!-- Charts Section -->
        <div class="charts-grid">
          <mat-card class="chart-card fade-in-up">
            <div class="chart-header">
              <h3><mat-icon>donut_large</mat-icon> Emissions Breakdown</h3>
              <p class="muted">Distribution by supply chain stage</p>
            </div>
            <div class="chart-container">
              <canvas baseChart
                [data]="breakdownData"
                [type]="breakdownType"
                [options]="breakdownOptions">
              </canvas>
            </div>
          </mat-card>

          <mat-card class="chart-card fade-in-up">
            <div class="chart-header">
              <h3><mat-icon>show_chart</mat-icon> Emissions Trend</h3>
              <p class="muted">Timeline progression</p>
            </div>
            <div class="chart-container">
              <canvas baseChart
                [data]="trendData"
                [type]="trendType"
                [options]="trendOptions">
              </canvas>
            </div>
          </mat-card>
        </div>

        <!-- Bar Chart -->
        <mat-card class="chart-card-full fade-in-up">
          <div class="chart-header">
            <h3><mat-icon>bar_chart</mat-icon> Stage Comparison</h3>
            <p class="muted">Detailed emissions by stage</p>
          </div>
          <div class="chart-container-large">
            <canvas baseChart
              [data]="barData"
              [type]="barType"
              [options]="barOptions">
            </canvas>
          </div>
        </mat-card>

        <!-- Recommendations -->
        <mat-card class="recommendations-card fade-in-up">
          <h3><mat-icon>lightbulb</mat-icon> Reduction Recommendations</h3>
          <div class="recommendations-list">
            <div class="recommendation-item">
              <mat-icon>local_shipping</mat-icon>
              <div>
                <h4>Optimize Transportation</h4>
                <p>Switch to electric or hybrid vehicles for local distribution. Potential reduction: 15-20%</p>
              </div>
            </div>
            <div class="recommendation-item">
              <mat-icon>factory</mat-icon>
              <div>
                <h4>Green Manufacturing</h4>
                <p>Implement renewable energy sources in production facilities. Potential reduction: 25-30%</p>
              </div>
            </div>
            <div class="recommendation-item">
              <mat-icon>people</mat-icon>
              <div>
                <h4>Supplier Selection</h4>
                <p>Partner with certified low-emission suppliers. Potential reduction: 10-15%</p>
              </div>
            </div>
            <div class="recommendation-item">
              <mat-icon>recycling</mat-icon>
              <div>
                <h4>Circular Economy</h4>
                <p>Implement recycling and reuse programs. Potential reduction: 8-12%</p>
              </div>
            </div>
          </div>
        </mat-card>
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
    .carbon-content {
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }
    .summary-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 1.5rem;
    }
    .summary-card {
      display: flex;
      gap: 1rem;
      padding: 1.5rem;
      transition: all 300ms ease;
    }
    .summary-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 12px 30px rgba(0, 0, 0, 0.1) !important;
    }
    .card-icon {
      width: 60px;
      height: 60px;
      border-radius: var(--radius-lg);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    .summary-card.primary .card-icon {
      background: linear-gradient(135deg, var(--primary), var(--primary-dark));
    }
    .summary-card.success .card-icon {
      background: linear-gradient(135deg, var(--success), #059669);
    }
    .summary-card.warning .card-icon {
      background: linear-gradient(135deg, var(--warning), #D97706);
    }
    .summary-card.info .card-icon {
      background: linear-gradient(135deg, #3B82F6, #2563EB);
    }
    .card-icon mat-icon {
      color: white;
      font-size: 32px;
      width: 32px;
      height: 32px;
    }
    .card-body {
      flex: 1;
    }
    .card-label {
      font-size: 0.875rem;
      color: var(--text-secondary);
      margin-bottom: 0.5rem;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .card-value {
      font-size: 2rem;
      font-weight: 700;
      color: var(--text-primary);
      margin-bottom: 0.25rem;
    }
    .card-subtitle {
      font-size: 0.8125rem;
      color: var(--text-muted);
    }
    .charts-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
      gap: 2rem;
    }
    .chart-card, .chart-card-full {
      padding: 2rem;
    }
    .chart-header {
      margin-bottom: 1.5rem;
    }
    .chart-header h3 {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin: 0 0 0.5rem 0;
      font-size: 1.25rem;
    }
    .chart-container {
      height: 300px;
      position: relative;
    }
    .chart-container-large {
      height: 350px;
      position: relative;
    }
    .recommendations-card {
      padding: 2rem;
    }
    .recommendations-card h3 {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin: 0 0 1.5rem 0;
    }
    .recommendations-list {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 1.5rem;
    }
    .recommendation-item {
      display: flex;
      gap: 1rem;
      padding: 1.5rem;
      background: var(--background);
      border-radius: var(--radius-md);
      border-left: 4px solid var(--primary);
      transition: all 250ms ease;
    }
    .recommendation-item:hover {
      background: var(--background-alt);
      transform: translateX(4px);
    }
    .recommendation-item mat-icon {
      color: var(--primary);
      font-size: 32px;
      width: 32px;
      height: 32px;
      flex-shrink: 0;
    }
    .recommendation-item h4 {
      margin: 0 0 0.5rem 0;
      font-size: 1rem;
    }
    .recommendation-item p {
      margin: 0;
      font-size: 0.875rem;
      color: var(--text-secondary);
      line-height: 1.5;
    }
    @media (max-width: 768px) {
      .summary-grid {
        grid-template-columns: 1fr;
      }
      .charts-grid {
        grid-template-columns: 1fr;
      }
      .recommendations-list {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class CarbonTrackerComponent implements OnInit {
  loading = true;
  emissions: any[] = [];
  total = 0;
  targetPercent = 25;
  highImpactStages = 0;
  avgPerStage = 0;

  breakdownData: ChartData<'doughnut'> = { labels: [], datasets: [] };
  breakdownType: ChartType = 'doughnut';
  breakdownOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'bottom' },
      tooltip: { callbacks: { label: (context) => `${context.label}: ${context.parsed} kg CO₂` } }
    }
  };

  trendData: ChartData<'line'> = { labels: [], datasets: [] };
  trendType: ChartType = 'line';
  trendOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { callbacks: { label: (context) => `${context.parsed.y} kg CO₂` } }
    },
    scales: {
      y: { beginAtZero: true, title: { display: true, text: 'Emissions (kg CO₂)' } }
    }
  };

  barData: ChartData<'bar'> = { labels: [], datasets: [] };
  barType: ChartType = 'bar';
  barOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { callbacks: { label: (context) => `${context.parsed.y} kg CO₂` } }
    },
    scales: {
      y: { beginAtZero: true, title: { display: true, text: 'Emissions (kg CO₂)' } }
    }
  };

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.getEmissionsForProject('p1').subscribe((list) => {
      this.emissions = list;
      this.total = Math.round(list.reduce((s, item) => s + (item.emissionsKg || 0), 0));
      this.highImpactStages = list.filter(e => e.emissionsKg > 300).length;
      this.avgPerStage = Math.round(this.total / list.length);

      // Breakdown chart (doughnut)
      this.breakdownData = {
        labels: list.map((l: any) => l.stage),
        datasets: [{
          data: list.map((l: any) => l.emissionsKg),
          backgroundColor: [
            'rgba(0, 168, 107, 0.8)',
            'rgba(30, 58, 138, 0.8)',
            'rgba(245, 158, 11, 0.8)',
            'rgba(239, 68, 68, 0.8)',
            'rgba(59, 130, 246, 0.8)',
            'rgba(139, 92, 246, 0.8)'
          ],
          borderWidth: 2,
          borderColor: '#fff'
        }]
      };

      // Trend chart (line)
      this.trendData = {
        labels: list.map((l: any) => new Date(l.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })),
        datasets: [{
          data: list.map((l: any) => l.emissionsKg),
          label: 'Emissions',
          borderColor: 'rgba(0, 168, 107, 1)',
          backgroundColor: 'rgba(0, 168, 107, 0.1)',
          fill: true,
          tension: 0.4
        }]
      };

      // Bar chart
      this.barData = {
        labels: list.map((l: any) => l.stage),
        datasets: [{
          data: list.map((l: any) => l.emissionsKg),
          backgroundColor: list.map((l: any) =>
            l.emissionsKg > 300 ? 'rgba(239, 68, 68, 0.8)' :
            l.emissionsKg > 100 ? 'rgba(245, 158, 11, 0.8)' :
            'rgba(16, 185, 129, 0.8)'
          ),
          borderWidth: 0
        }]
      };

      this.loading = false;
    });
  }
}
