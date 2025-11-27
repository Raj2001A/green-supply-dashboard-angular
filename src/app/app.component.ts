import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

/**
 * Root component for the Green Supply Chain Tracker application.
 * This component serves as the main entry point and handles the router outlet.
 *
 * Features:
 * - Standalone component architecture (Angular 18)
 * - Router outlet for navigation
 * - Clean, minimal root component following best practices
 */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Green Supply Chain Tracker';
}
