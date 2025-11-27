import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home.component';
import { DashboardComponent } from './pages/dashboard.component';
import { ProjectsComponent } from './pages/projects.component';
import { AboutComponent } from './pages/about.component';
import { ContactComponent } from './pages/contact.component';
import { SupplyChainTimelineComponent } from './pages/supply-chain-timeline.component';
import { CarbonTrackerComponent } from './pages/carbon-tracker.component';
import { ProductPassportComponent } from './pages/product-passport.component';
import { SuppliersComponent } from './pages/suppliers.component';
import { AnalyticsComponent } from './pages/analytics.component';

export const routes: Routes = [
	{ path: '', component: HomeComponent },
	{ path: 'dashboard', component: DashboardComponent },
	{ path: 'timeline', component: SupplyChainTimelineComponent },
	{ path: 'carbon', component: CarbonTrackerComponent },
	{ path: 'passport', component: ProductPassportComponent },
	{ path: 'suppliers', component: SuppliersComponent },
	{ path: 'analytics', component: AnalyticsComponent },
	{ path: 'projects', component: ProjectsComponent },
	{ path: 'about', component: AboutComponent },
	{ path: 'contact', component: ContactComponent },
	{ path: '**', redirectTo: '' }
];
