import { bootstrapApplication } from '@angular/platform-browser';
import { Chart, registerables } from 'chart.js';
// register chart.js components so charts render correctly
Chart.register(...registerables);
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
