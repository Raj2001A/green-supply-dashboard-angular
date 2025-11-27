import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

/**
 * Navigation component with responsive design and active route highlighting
 * Features:
 * - Responsive mobile menu with smooth animations
 * - Active route highlighting
 * - Material Design integration
 * - Accessibility support
 */
@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule, RouterModule, MatToolbarModule, MatIconModule, MatButtonModule],
  template: `
    <mat-toolbar color="primary" class="navbar">
      <div class="nav-container">
        <a class="brand" routerLink="/" (click)="close()">
          <mat-icon>eco</mat-icon>
          <span class="brand-text">Green Supply Tracker</span>
        </a>

        <div class="nav-actions">
          <nav class="desktop-links">
            <a mat-button routerLink="/dashboard" routerLinkActive="active-link" [routerLinkActiveOptions]="{exact: false}">
              <mat-icon>dashboard</mat-icon>
              <span>Dashboard</span>
            </a>
            <a mat-button routerLink="/timeline" routerLinkActive="active-link">
              <mat-icon>timeline</mat-icon>
              <span>Timeline</span>
            </a>
            <a mat-button routerLink="/carbon" routerLinkActive="active-link">
              <mat-icon>insights</mat-icon>
              <span>Carbon</span>
            </a>
            <a mat-button routerLink="/passport" routerLinkActive="active-link">
              <mat-icon>badge</mat-icon>
              <span>Passport</span>
            </a>
            <a mat-button routerLink="/suppliers" routerLinkActive="active-link">
              <mat-icon>people</mat-icon>
              <span>Suppliers</span>
            </a>
            <a mat-button routerLink="/analytics" routerLinkActive="active-link">
              <mat-icon>bar_chart</mat-icon>
              <span>Analytics</span>
            </a>
          </nav>

          <!-- mobile menu toggle -->
          <button
            mat-icon-button
            class="mobile-toggle"
            type="button"
            (click)="toggle()"
            [attr.aria-label]="open ? 'Close menu' : 'Open menu'"
            [attr.aria-expanded]="open">
            <mat-icon>{{ open ? 'close' : 'menu' }}</mat-icon>
          </button>
        </div>
      </div>
    </mat-toolbar>

    <!-- mobile menu panel -->
    <div class="mobile-panel" *ngIf="open" [@slideDown]>
      <nav class="mobile-nav">
        <a routerLink="/dashboard" routerLinkActive="active-mobile" (click)="close()">
          <mat-icon>dashboard</mat-icon>
          <span>Dashboard</span>
        </a>
        <a routerLink="/timeline" routerLinkActive="active-mobile" (click)="close()">
          <mat-icon>timeline</mat-icon>
          <span>Timeline</span>
        </a>
        <a routerLink="/carbon" routerLinkActive="active-mobile" (click)="close()">
          <mat-icon>insights</mat-icon>
          <span>Carbon Tracker</span>
        </a>
        <a routerLink="/passport" routerLinkActive="active-mobile" (click)="close()">
          <mat-icon>badge</mat-icon>
          <span>Product Passport</span>
        </a>
        <a routerLink="/suppliers" routerLinkActive="active-mobile" (click)="close()">
          <mat-icon>people</mat-icon>
          <span>Suppliers</span>
        </a>
        <a routerLink="/analytics" routerLinkActive="active-mobile" (click)="close()">
          <mat-icon>bar_chart</mat-icon>
          <span>Analytics</span>
        </a>
        <a routerLink="/projects" routerLinkActive="active-mobile" (click)="close()">
          <mat-icon>inventory_2</mat-icon>
          <span>Projects</span>
        </a>
        <a routerLink="/about" routerLinkActive="active-mobile" (click)="close()">
          <mat-icon>info</mat-icon>
          <span>About</span>
        </a>
        <a routerLink="/contact" routerLinkActive="active-mobile" (click)="close()">
          <mat-icon>contact_mail</mat-icon>
          <span>Contact</span>
        </a>
      </nav>
      <!-- Backdrop to close menu when clicking outside -->
      <div class="mobile-backdrop" (click)="close()"></div>
    </div>
  `,
  styles: [`
    .navbar {
      position: sticky;
      top: 0;
      z-index: 1000;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    .nav-container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      max-width: 1400px;
      margin: 0 auto;
      width: 100%;
      padding: 0 1rem;
    }

    .brand {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: white;
      text-decoration: none;
      font-weight: 700;
      font-size: 1.125rem;
      transition: opacity 250ms ease;
    }

    .brand:hover {
      opacity: 0.9;
    }

    .brand mat-icon {
      font-size: 28px;
      width: 28px;
      height: 28px;
    }

    .brand-text {
      display: inline-block;
    }

    .nav-actions {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .desktop-links {
      display: flex;
      align-items: center;
      gap: 0.25rem;
    }

    .desktop-links a {
      color: rgba(255, 255, 255, 0.9);
      display: flex;
      align-items: center;
      gap: 0.375rem;
      padding: 0.5rem 0.875rem;
      border-radius: 6px;
      transition: all 250ms ease;
      position: relative;
    }

    .desktop-links a mat-icon {
      font-size: 20px;
      width: 20px;
      height: 20px;
    }

    .desktop-links a:hover {
      background: rgba(255, 255, 255, 0.15);
      color: white;
    }

    .desktop-links a.active-link {
      background: rgba(255, 255, 255, 0.2);
      color: white;
      font-weight: 600;
    }

    .desktop-links a.active-link::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0.875rem;
      right: 0.875rem;
      height: 2px;
      background: white;
      border-radius: 2px 2px 0 0;
    }

    .mobile-toggle {
      display: none;
      color: white;
    }

    /* Mobile Panel */
    .mobile-panel {
      position: fixed;
      top: 64px;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 999;
      animation: slideDown 300ms ease;
    }

    .mobile-nav {
      position: relative;
      background: var(--card-bg);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      max-height: calc(100vh - 64px);
      overflow-y: auto;
      z-index: 1000;
    }

    .mobile-nav a {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1rem 1.5rem;
      color: var(--text-primary);
      text-decoration: none;
      border-bottom: 1px solid var(--border-light);
      transition: all 200ms ease;
    }

    .mobile-nav a mat-icon {
      color: var(--primary);
      font-size: 24px;
      width: 24px;
      height: 24px;
    }

    .mobile-nav a:hover {
      background: var(--background-alt);
      padding-left: 2rem;
    }

    .mobile-nav a.active-mobile {
      background: rgba(0, 168, 107, 0.08);
      border-left: 4px solid var(--primary);
      font-weight: 600;
    }

    .mobile-backdrop {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      z-index: 998;
      animation: fadeIn 300ms ease;
    }

    @keyframes slideDown {
      from {
        opacity: 0;
        transform: translateY(-10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    /* Responsive Design */
    @media (max-width: 1024px) {
      .desktop-links a span {
        display: none;
      }

      .desktop-links a {
        padding: 0.5rem;
      }
    }

    @media (max-width: 768px) {
      .brand-text {
        display: none;
      }

      .desktop-links {
        display: none;
      }

      .mobile-toggle {
        display: inline-flex;
      }
    }

    @media (max-width: 480px) {
      .nav-container {
        padding: 0 0.5rem;
      }
    }
  `],
  animations: []
})
export class NavComponent {
  open = false;

  constructor(private router?: Router) {
    // Close mobile panel on navigation
    if (this.router) {
      this.router.events.subscribe((e) => {
        if (e instanceof NavigationEnd) {
          this.open = false;
        }
      });
    }
  }

  toggle(): void {
    this.open = !this.open;
  }

  close(): void {
    this.open = false;
  }
}

