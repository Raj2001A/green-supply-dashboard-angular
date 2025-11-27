import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

/**
 * Reusable error message component
 * Displays error messages with optional retry functionality
 * 
 * Usage:
 * <app-error-message message="Failed to load data"></app-error-message>
 * <app-error-message message="Error occurred" (retry)="loadData()"></app-error-message>
 * <app-error-message type="warning" message="Warning message"></app-error-message>
 */
@Component({
  selector: 'app-error-message',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  template: `
    <div class="error-container" [class]="'error-' + type">
      <div class="error-icon">
        <mat-icon>{{ getIcon() }}</mat-icon>
      </div>
      <div class="error-content">
        <h4 class="error-title">{{ title || getDefaultTitle() }}</h4>
        <p class="error-message">{{ message }}</p>
        <button 
          *ngIf="showRetry" 
          mat-flat-button 
          color="primary" 
          (click)="onRetry()"
          class="error-retry-btn">
          <mat-icon>refresh</mat-icon>
          Retry
        </button>
      </div>
    </div>
  `,
  styles: [`
    .error-container {
      display: flex;
      align-items: flex-start;
      gap: 1rem;
      padding: 1.5rem;
      border-radius: var(--radius-md);
      border-left: 4px solid;
      animation: fadeIn 400ms ease;
    }

    .error-error {
      background: rgba(239, 68, 68, 0.05);
      border-left-color: var(--danger);
    }

    .error-warning {
      background: rgba(245, 158, 11, 0.05);
      border-left-color: var(--warning);
    }

    .error-info {
      background: rgba(59, 130, 246, 0.05);
      border-left-color: var(--info);
    }

    .error-icon {
      flex-shrink: 0;
    }

    .error-error .error-icon mat-icon {
      color: var(--danger);
    }

    .error-warning .error-icon mat-icon {
      color: var(--warning);
    }

    .error-info .error-icon mat-icon {
      color: var(--info);
    }

    .error-content {
      flex: 1;
    }

    .error-title {
      margin: 0 0 0.5rem 0;
      font-size: 1rem;
      font-weight: 600;
      color: var(--text-primary);
    }

    .error-message {
      margin: 0 0 1rem 0;
      color: var(--text-secondary);
      font-size: 0.875rem;
    }

    .error-retry-btn {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(-10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `]
})
export class ErrorMessageComponent {
  @Input() message: string = 'An error occurred';
  @Input() title: string = '';
  @Input() type: 'error' | 'warning' | 'info' = 'error';
  @Input() showRetry: boolean = true;
  @Output() retry = new EventEmitter<void>();

  getIcon(): string {
    switch (this.type) {
      case 'error': return 'error';
      case 'warning': return 'warning';
      case 'info': return 'info';
      default: return 'error';
    }
  }

  getDefaultTitle(): string {
    switch (this.type) {
      case 'error': return 'Error';
      case 'warning': return 'Warning';
      case 'info': return 'Information';
      default: return 'Error';
    }
  }

  onRetry(): void {
    this.retry.emit();
  }
}

