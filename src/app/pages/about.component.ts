import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavComponent } from '../components/nav.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

/**
 * About page - Project information and tech stack
 * Demonstrates: Content presentation, responsive layout
 */
@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterModule, NavComponent, MatCardModule, MatIconModule, MatButtonModule],
  template: `
    <app-nav></app-nav>
    <main class="container fade-in">
      <div class="about-header">
        <h1>About This Project</h1>
        <p class="lead">A comprehensive Angular 18 portfolio project demonstrating modern frontend development skills for the Frontend Developer Intern role at RePut.ai</p>
      </div>

      <mat-card class="project-overview">
        <h2><mat-icon>info</mat-icon> Project Overview</h2>
        <p>The Green Supply Chain Tracker is a full-featured Angular 18 application that demonstrates supply chain transparency and sustainability tracking. This project showcases production-ready code, best practices, and modern web development techniques.</p>
        <p>Built entirely with <strong>mock data</strong> to demonstrate frontend capabilities without requiring a backend infrastructure.</p>
      </mat-card>

      <div class="tech-section">
        <h2>Technology Stack</h2>
        <div class="tech-grid">
          <mat-card class="tech-card fade-in-up stagger-1">
            <mat-icon class="tech-icon angular">code</mat-icon>
            <h3>Angular 18</h3>
            <ul>
              <li>Standalone components</li>
              <li>Reactive forms</li>
              <li>Router with lazy loading</li>
              <li>RxJS operators</li>
              <li>TypeScript strict mode</li>
            </ul>
          </mat-card>

          <mat-card class="tech-card fade-in-up stagger-2">
            <mat-icon class="tech-icon material">palette</mat-icon>
            <h3>Material Design</h3>
            <ul>
              <li>Angular Material components</li>
              <li>Custom theming</li>
              <li>Responsive layouts</li>
              <li>Accessibility (ARIA)</li>
              <li>Material icons</li>
            </ul>
          </mat-card>

          <mat-card class="tech-card fade-in-up stagger-3">
            <mat-icon class="tech-icon charts">bar_chart</mat-icon>
            <h3>Data Visualization</h3>
            <ul>
              <li>Chart.js integration</li>
              <li>ng2-charts</li>
              <li>Leaflet maps</li>
              <li>QR code generation</li>
              <li>Interactive dashboards</li>
            </ul>
          </mat-card>

          <mat-card class="tech-card fade-in-up stagger-4">
            <mat-icon class="tech-icon responsive">devices</mat-icon>
            <h3>Responsive Design</h3>
            <ul>
              <li>Mobile-first approach</li>
              <li>CSS Grid & Flexbox</li>
              <li>SCSS with variables</li>
              <li>CSS animations</li>
              <li>Cross-browser support</li>
            </ul>
          </mat-card>
        </div>
      </div>

      <div class="features-section">
        <h2>Key Features Implemented</h2>
        <div class="features-list">
          <div class="feature-item" *ngFor="let feature of features">
            <mat-icon>{{ feature.icon }}</mat-icon>
            <div>
              <h4>{{ feature.title }}</h4>
              <p>{{ feature.description }}</p>
            </div>
          </div>
        </div>
      </div>

      <mat-card class="skills-card">
        <h2><mat-icon>school</mat-icon> Skills Demonstrated</h2>
        <div class="skills-grid">
          <div class="skill-badge" *ngFor="let skill of skills">{{ skill }}</div>
        </div>
      </mat-card>

      <div class="cta-section">
        <h2>Explore the Application</h2>
        <p>Navigate through different sections to see various Angular features in action</p>
        <div class="cta-buttons">
          <button mat-flat-button color="primary" routerLink="/dashboard">
            <mat-icon>dashboard</mat-icon>
            View Dashboard
          </button>
          <button mat-stroked-button routerLink="/timeline">
            <mat-icon>timeline</mat-icon>
            Supply Chain Timeline
          </button>
          <button mat-stroked-button routerLink="/contact">
            <mat-icon>contact_mail</mat-icon>
            Contact
          </button>
        </div>
      </div>
    </main>
  `,
  styles: [`
    .about-header { text-align: center; margin-bottom: 3rem; }
    .about-header h1 { font-size: 2.5rem; margin-bottom: 1rem; }
    .lead { font-size: 1.125rem; color: var(--text-secondary); max-width: 700px; margin: 0 auto; line-height: 1.7; }
    .project-overview { padding: 2rem; margin-bottom: 3rem; }
    .project-overview h2 { display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1rem; }
    .project-overview p { line-height: 1.7; color: var(--text-secondary); }
    .tech-section { margin-bottom: 3rem; }
    .tech-section h2 { text-align: center; margin-bottom: 2rem; }
    .tech-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem; }
    .tech-card { padding: 1.5rem; }
    .tech-icon { font-size: 48px; width: 48px; height: 48px; margin-bottom: 1rem; }
    .tech-icon.angular { color: #DD0031; }
    .tech-icon.material { color: #3F51B5; }
    .tech-icon.charts { color: #FF6384; }
    .tech-icon.responsive { color: #00A86B; }
    .tech-card h3 { margin: 0 0 1rem 0; font-size: 1.25rem; }
    .tech-card ul { margin: 0; padding-left: 1.25rem; }
    .tech-card li { margin-bottom: 0.5rem; color: var(--text-secondary); }
    .features-section { margin-bottom: 3rem; }
    .features-section h2 { text-align: center; margin-bottom: 2rem; }
    .features-list { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem; }
    .feature-item { display: flex; gap: 1rem; padding: 1.5rem; background: var(--background); border-radius: var(--radius-md); border-left: 4px solid var(--primary); }
    .feature-item mat-icon { color: var(--primary); font-size: 32px; width: 32px; height: 32px; flex-shrink: 0; }
    .feature-item h4 { margin: 0 0 0.5rem 0; }
    .feature-item p { margin: 0; color: var(--text-secondary); font-size: 0.875rem; }
    .skills-card { padding: 2rem; margin-bottom: 3rem; }
    .skills-card h2 { display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1.5rem; }
    .skills-grid { display: flex; flex-wrap: wrap; gap: 0.75rem; }
    .skill-badge { padding: 0.5rem 1rem; background: linear-gradient(135deg, var(--primary), var(--secondary)); color: white; border-radius: var(--radius-full); font-size: 0.875rem; font-weight: 600; }
    .cta-section { text-align: center; padding: 3rem 0; }
    .cta-section h2 { margin-bottom: 0.5rem; }
    .cta-section p { color: var(--text-secondary); margin-bottom: 2rem; }
    .cta-buttons { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; }
    @media (max-width: 768px) {
      .about-header h1 { font-size: 2rem; }
      .tech-grid, .features-list { grid-template-columns: 1fr; }
      .cta-buttons { flex-direction: column; }
    }
  `]
})
export class AboutComponent {
  features = [
    { icon: 'timeline', title: 'Supply Chain Timeline', description: 'Interactive timeline with emissions tracking per stage' },
    { icon: 'insights', title: 'Carbon Calculator', description: 'Real-time carbon footprint calculation with visualizations' },
    { icon: 'badge', title: 'Product Passports', description: 'Digital passports with QR codes and blockchain verification' },
    { icon: 'people', title: 'Supplier Management', description: 'Supplier ratings, certifications, and map integration' },
    { icon: 'bar_chart', title: 'Analytics Dashboard', description: 'Comprehensive charts and data insights' },
    { icon: 'inventory_2', title: 'Project Tracking', description: 'Multi-project management and monitoring' }
  ];

  skills = [
    'Angular 18', 'TypeScript', 'RxJS', 'Material Design', 'Reactive Forms',
    'Component Architecture', 'State Management', 'Responsive Design', 'SCSS',
    'Chart.js', 'Leaflet Maps', 'QR Codes', 'Animations', 'Accessibility'
  ];
}
