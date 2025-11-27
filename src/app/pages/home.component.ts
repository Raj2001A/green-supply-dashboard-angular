import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavComponent } from '../components/nav.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

/**
 * Home page component - Landing page for the Green Supply Chain Tracker
 * Features:
 * - Hero section with call-to-action buttons
 * - Feature showcase with icons
 * - Statistics section
 * - Technology highlights
 * - Smooth animations and transitions
 */
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, NavComponent, MatIconModule, MatButtonModule, MatCardModule],
  template: `
    <app-nav></app-nav>

    <!-- Hero Section -->
    <section class="hero">
      <div class="container">
        <div class="hero-content fade-in">
          <div class="hero-badge">
            <mat-icon>eco</mat-icon>
            <span>Sustainable Supply Chain Management</span>
          </div>
          <h1 class="hero-title">
            Track Your Supply Chain's
            <span class="gradient-text">Carbon Footprint</span>
          </h1>
          <p class="hero-description">
            Monitor emissions across every stage of your supply chain, verify product sustainability,
            and make data-driven decisions for a greener future. Built with Angular 18.
          </p>
          <div class="hero-actions">
            <a routerLink="/dashboard" class="btn btn-primary btn-lg">
              <mat-icon>dashboard</mat-icon>
              Get Started
            </a>
            <a routerLink="/timeline" class="btn btn-outline btn-lg">
              <mat-icon>timeline</mat-icon>
              View Demo
            </a>
          </div>

          <!-- Quick Stats -->
          <div class="hero-stats">
            <div class="stat-item fade-in stagger-1">
              <div class="stat-value">100%</div>
              <div class="stat-label">Transparent</div>
            </div>
            <div class="stat-item fade-in stagger-2">
              <div class="stat-value">Real-time</div>
              <div class="stat-label">Tracking</div>
            </div>
            <div class="stat-item fade-in stagger-3">
              <div class="stat-value">Verified</div>
              <div class="stat-label">Blockchain</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="features-section">
      <div class="container">
        <div class="section-header fade-in">
          <h2>Comprehensive Supply Chain Insights</h2>
          <p class="section-description">
            Everything you need to track, analyze, and optimize your supply chain's environmental impact
          </p>
        </div>

        <div class="features-grid">
          <mat-card class="feature-card fade-in-up stagger-1">
            <div class="feature-icon primary">
              <mat-icon>timeline</mat-icon>
            </div>
            <h3>Supply Chain Timeline</h3>
            <p>Track every stage of your product journey with detailed emissions data and location tracking.</p>
            <a routerLink="/timeline" class="feature-link">
              Explore Timeline
              <mat-icon>arrow_forward</mat-icon>
            </a>
          </mat-card>

          <mat-card class="feature-card fade-in-up stagger-2">
            <div class="feature-icon success">
              <mat-icon>insights</mat-icon>
            </div>
            <h3>Carbon Footprint Calculator</h3>
            <p>Calculate and visualize carbon emissions with interactive charts and detailed breakdowns.</p>
            <a routerLink="/carbon" class="feature-link">
              Calculate Emissions
              <mat-icon>arrow_forward</mat-icon>
            </a>
          </mat-card>

          <mat-card class="feature-card fade-in-up stagger-3">
            <div class="feature-icon warning">
              <mat-icon>badge</mat-icon>
            </div>
            <h3>Product Passports</h3>
            <p>Digital passports with QR codes, blockchain verification, and complete product history.</p>
            <a routerLink="/passport" class="feature-link">
              View Passports
              <mat-icon>arrow_forward</mat-icon>
            </a>
          </mat-card>

          <mat-card class="feature-card fade-in-up stagger-4">
            <div class="feature-icon secondary">
              <mat-icon>people</mat-icon>
            </div>
            <h3>Supplier Management</h3>
            <p>Evaluate and manage suppliers with sustainability ratings and certification tracking.</p>
            <a routerLink="/suppliers" class="feature-link">
              Manage Suppliers
              <mat-icon>arrow_forward</mat-icon>
            </a>
          </mat-card>

          <mat-card class="feature-card fade-in-up stagger-5">
            <div class="feature-icon info">
              <mat-icon>bar_chart</mat-icon>
            </div>
            <h3>Analytics Dashboard</h3>
            <p>Comprehensive analytics with charts, trends, and actionable insights for decision-making.</p>
            <a routerLink="/analytics" class="feature-link">
              View Analytics
              <mat-icon>arrow_forward</mat-icon>
            </a>
          </mat-card>

          <mat-card class="feature-card fade-in-up stagger-6">
            <div class="feature-icon accent">
              <mat-icon>inventory_2</mat-icon>
            </div>
            <h3>Project Tracking</h3>
            <p>Monitor multiple projects and products with centralized tracking and reporting.</p>
            <a routerLink="/projects" class="feature-link">
              Browse Projects
              <mat-icon>arrow_forward</mat-icon>
            </a>
          </mat-card>
        </div>
      </div>
    </section>

    <!-- Technology Section -->
    <section class="tech-section">
      <div class="container">
        <div class="section-header fade-in">
          <h2>Built with Modern Technologies</h2>
          <p class="section-description">
            Showcasing Angular 18 best practices and production-ready patterns
          </p>
        </div>

        <div class="tech-grid">
          <div class="tech-item fade-in stagger-1">
            <mat-icon>code</mat-icon>
            <h4>Angular 18</h4>
            <p>Standalone components, signals, and latest features</p>
          </div>
          <div class="tech-item fade-in stagger-2">
            <mat-icon>style</mat-icon>
            <h4>Material Design</h4>
            <p>Professional UI components and design system</p>
          </div>
          <div class="tech-item fade-in stagger-3">
            <mat-icon>sync</mat-icon>
            <h4>RxJS</h4>
            <p>Reactive programming and state management</p>
          </div>
          <div class="tech-item fade-in stagger-4">
            <mat-icon>devices</mat-icon>
            <h4>Responsive</h4>
            <p>Mobile-first design with CSS Grid and Flexbox</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section">
      <div class="container">
        <div class="cta-content fade-in">
          <h2>Ready to Track Your Supply Chain?</h2>
          <p>Start monitoring your carbon footprint and make sustainable decisions today.</p>
          <div class="cta-actions">
            <a routerLink="/dashboard" class="btn btn-primary btn-lg">
              <mat-icon>dashboard</mat-icon>
              Open Dashboard
            </a>
            <a routerLink="/about" class="btn btn-ghost btn-lg">
              <mat-icon>info</mat-icon>
              Learn More
            </a>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    /* Hero Section */
    .hero {
      background: linear-gradient(135deg, rgba(0, 168, 107, 0.05) 0%, rgba(30, 58, 138, 0.05) 100%);
      padding: 4rem 0 3rem;
      position: relative;
      overflow: hidden;
    }

    .hero::before {
      content: '';
      position: absolute;
      top: -50%;
      right: -10%;
      width: 500px;
      height: 500px;
      background: radial-gradient(circle, rgba(0, 168, 107, 0.1) 0%, transparent 70%);
      border-radius: 50%;
    }

    .hero-content {
      position: relative;
      z-index: 1;
      max-width: 800px;
      margin: 0 auto;
      text-align: center;
    }

    .hero-badge {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem 1rem;
      background: rgba(0, 168, 107, 0.1);
      border: 1px solid rgba(0, 168, 107, 0.2);
      border-radius: 50px;
      color: var(--primary-dark);
      font-size: 0.875rem;
      font-weight: 600;
      margin-bottom: 1.5rem;
    }

    .hero-badge mat-icon {
      font-size: 20px;
      width: 20px;
      height: 20px;
    }

    .hero-title {
      font-size: 3rem;
      font-weight: 700;
      line-height: 1.2;
      margin-bottom: 1.5rem;
      color: var(--text-primary);
    }

    .gradient-text {
      background: linear-gradient(135deg, var(--primary), var(--secondary));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .hero-description {
      font-size: 1.125rem;
      color: var(--text-secondary);
      line-height: 1.7;
      margin-bottom: 2rem;
      max-width: 600px;
      margin-left: auto;
      margin-right: auto;
    }

    .hero-actions {
      display: flex;
      gap: 1rem;
      justify-content: center;
      margin-bottom: 3rem;
      flex-wrap: wrap;
    }

    .hero-stats {
      display: flex;
      gap: 3rem;
      justify-content: center;
      padding-top: 2rem;
      border-top: 1px solid var(--border-light);
    }

    .stat-item {
      text-align: center;
    }

    .stat-value {
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--primary);
      margin-bottom: 0.25rem;
    }

    .stat-label {
      font-size: 0.875rem;
      color: var(--text-secondary);
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    /* Features Section */
    .features-section {
      padding: 4rem 0;
      background: var(--background);
    }

    .section-header {
      text-align: center;
      margin-bottom: 3rem;
    }

    .section-header h2 {
      font-size: 2.5rem;
      font-weight: 700;
      margin-bottom: 1rem;
      color: var(--text-primary);
    }

    .section-description {
      font-size: 1.125rem;
      color: var(--text-secondary);
      max-width: 600px;
      margin: 0 auto;
    }

    .features-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: 2rem;
    }

    .feature-card {
      padding: 2rem;
      transition: all 300ms ease;
      cursor: pointer;
      border: 1px solid transparent;
    }

    .feature-card:hover {
      transform: translateY(-8px);
      box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12);
      border-color: var(--primary);
    }

    .feature-icon {
      width: 60px;
      height: 60px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 1.5rem;
    }

    .feature-icon mat-icon {
      font-size: 32px;
      width: 32px;
      height: 32px;
      color: white;
    }

    .feature-icon.primary { background: linear-gradient(135deg, var(--primary), var(--primary-dark)); }
    .feature-icon.success { background: linear-gradient(135deg, #10B981, #059669); }
    .feature-icon.warning { background: linear-gradient(135deg, #F59E0B, #D97706); }
    .feature-icon.secondary { background: linear-gradient(135deg, var(--secondary), var(--secondary-dark)); }
    .feature-icon.info { background: linear-gradient(135deg, #3B82F6, #2563EB); }
    .feature-icon.accent { background: linear-gradient(135deg, #8B5CF6, #7C3AED); }

    .feature-card h3 {
      font-size: 1.25rem;
      font-weight: 600;
      margin-bottom: 0.75rem;
      color: var(--text-primary);
    }

    .feature-card p {
      color: var(--text-secondary);
      line-height: 1.6;
      margin-bottom: 1rem;
    }

    .feature-link {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      color: var(--primary);
      font-weight: 600;
      text-decoration: none;
      transition: gap 250ms ease;
    }

    .feature-link:hover {
      gap: 0.75rem;
    }

    .feature-link mat-icon {
      font-size: 18px;
      width: 18px;
      height: 18px;
    }

    /* Technology Section */
    .tech-section {
      padding: 4rem 0;
      background: var(--card-bg);
    }

    .tech-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 2rem;
    }

    .tech-item {
      text-align: center;
      padding: 2rem 1rem;
      border-radius: var(--radius-lg);
      background: var(--background);
      transition: all 250ms ease;
    }

    .tech-item:hover {
      transform: translateY(-4px);
      background: linear-gradient(135deg, rgba(0, 168, 107, 0.05), rgba(30, 58, 138, 0.05));
    }

    .tech-item mat-icon {
      font-size: 48px;
      width: 48px;
      height: 48px;
      color: var(--primary);
      margin-bottom: 1rem;
    }

    .tech-item h4 {
      font-size: 1.125rem;
      font-weight: 600;
      margin-bottom: 0.5rem;
      color: var(--text-primary);
    }

    .tech-item p {
      font-size: 0.875rem;
      color: var(--text-secondary);
      margin: 0;
    }

    /* CTA Section */
    .cta-section {
      padding: 4rem 0;
      background: linear-gradient(135deg, var(--primary), var(--secondary));
      color: white;
    }

    .cta-content {
      text-align: center;
      max-width: 700px;
      margin: 0 auto;
    }

    .cta-content h2 {
      font-size: 2.5rem;
      font-weight: 700;
      margin-bottom: 1rem;
      color: white;
    }

    .cta-content p {
      font-size: 1.125rem;
      margin-bottom: 2rem;
      opacity: 0.95;
    }

    .cta-actions {
      display: flex;
      gap: 1rem;
      justify-content: center;
      flex-wrap: wrap;
    }

    .cta-section .btn {
      background: white;
      color: var(--primary);
    }

    .cta-section .btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
    }

    .cta-section .btn-ghost {
      background: transparent;
      border-color: white;
      color: white;
    }

    .cta-section .btn-ghost:hover {
      background: rgba(255, 255, 255, 0.1);
    }

    /* Responsive Design */
    @media (max-width: 768px) {
      .hero-title {
        font-size: 2rem;
      }

      .hero-description {
        font-size: 1rem;
      }

      .hero-actions {
        flex-direction: column;
      }

      .hero-stats {
        gap: 1.5rem;
      }

      .section-header h2 {
        font-size: 2rem;
      }

      .features-grid {
        grid-template-columns: 1fr;
      }

      .tech-grid {
        grid-template-columns: repeat(2, 1fr);
      }

      .cta-content h2 {
        font-size: 2rem;
      }

      .cta-actions {
        flex-direction: column;
      }
    }

    @media (max-width: 480px) {
      .hero {
        padding: 3rem 0 2rem;
      }

      .hero-title {
        font-size: 1.75rem;
      }

      .hero-stats {
        flex-direction: column;
        gap: 1rem;
      }

      .tech-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class HomeComponent {}
