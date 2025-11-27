import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import type { ChartConfiguration, ChartData, ChartType, ChartOptions } from 'chart.js';
import { NavComponent } from '../components/nav.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [CommonModule, NavComponent, BaseChartDirective, MatCardModule, MatIconModule],
  template: `
    <app-nav></app-nav>
    <main class="container">
      <h2>Analytics</h2>
      <p class="muted">Emissions totals and breakdowns</p>

      <div *ngIf="loading">Loading analytics…</div>

      <section *ngIf="!loading" class="row">
        <mat-card class="card col mat-elevation-z2" style="height:300px;">
          <div style="display:flex;align-items:center;gap:8px"><mat-icon>inventory_2</mat-icon><h3 style="margin:0">Totals (by product)</h3></div>
          <canvas baseChart
            [data]="totalsData"
            [type]="totalsType"
            [options]="totalsOptions">
          </canvas>
        </mat-card>

        <mat-card class="card col mat-elevation-z2" style="height:300px;">
          <div style="display:flex;align-items:center;gap:8px"><mat-icon>pie_chart</mat-icon><h3 style="margin:0">By stage</h3></div>
          <canvas baseChart
            [data]="byStageData"
            [type]="byStageType"
            [options]="byStageOptions">
          </canvas>
        </mat-card>
      </section>
    </main>
  `
})
export class AnalyticsComponent implements OnInit {
  loading = true;
  data: any;
  totalsData: ChartData<'bar'> = { labels: [], datasets: [] };
  totalsType: ChartType = 'bar';
  totalsOptions: ChartOptions = { responsive: true, maintainAspectRatio: false };

  byStageData: ChartData<'doughnut'> = { labels: [], datasets: [] };
  byStageType: ChartType = 'doughnut';
  byStageOptions: ChartOptions = { responsive: true, maintainAspectRatio: false };

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.getAnalytics().subscribe((d) => {
      this.data = d;
      // build totals chart
      this.totalsData.labels = d.totals.map((t: any) => t.id);
      this.totalsData.datasets = [
        { data: d.totals.map((t: any) => t.total), label: 'kg CO2' }
      ];

      // build by-stage doughnut
      this.byStageData.labels = Object.keys(d.byStage || {});
      this.byStageData.datasets = [ { data: Object.values(d.byStage || {}), label: 'kg CO2' } ];

      this.loading = false;
    });
  }

  stageKeys() {
    return this.data ? Object.keys(this.data.byStage) : [];
  }
}
