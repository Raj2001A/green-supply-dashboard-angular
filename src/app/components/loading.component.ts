import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Reusable loading spinner component
 * Displays an animated loading indicator with optional message
 * 
 * Usage:
 * <app-loading></app-loading>
 * <app-loading message="Loading data..."></app-loading>
 * <app-loading size="large"></app-loading>
 */
@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="loading-container" [class.loading-fullscreen]="fullscreen">
      <div class="loading-spinner" [class.loading-lg]="size === 'large'" [class.loading-sm]="size === 'small'"></div>
      <p *ngIf="message" class="loading-message">{{ message }}</p>
    </div>
  `,
  styles: [`
    .loading-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 2rem;
      gap: 1rem;
    }

    .loading-fullscreen {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(255, 255, 255, 0.9);
      z-index: 9999;
    }

    .loading-spinner {
      width: 40px;
      height: 40px;
      border: 4px solid var(--border-color);
      border-top-color: var(--primary);
      border-radius: 50%;
      animation: spin 800ms linear infinite;
    }

    .loading-sm {
      width: 20px;
      height: 20px;
      border-width: 3px;
    }

    .loading-lg {
      width: 60px;
      height: 60px;
      border-width: 5px;
    }

    .loading-message {
      color: var(--text-secondary);
      font-size: 0.875rem;
      margin: 0;
      animation: pulse 1.5s ease-in-out infinite;
    }

    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }

    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }
  `]
})
export class LoadingComponent {
  @Input() message: string = '';
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  @Input() fullscreen: boolean = false;
}

