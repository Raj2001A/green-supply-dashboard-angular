import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from '../components/nav.component';
import { ApiService } from '../services/api.service';
import { StateService } from '../services/state.service';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, NavComponent],
  template: `
    <app-nav></app-nav>
    <main class="container projects">
      <h2>Projects</h2>
      <div class="list">
        <article *ngFor="let p of projects" class="project-card" (click)="select(p)">
          <h4>{{ p.name }}</h4>
          <p>{{ p.description }}</p>
          <small class="meta">{{ p.stack }}</small>
        </article>
      </div>
    </main>
  `,
  styles: [
    `
    .container{max-width:1100px;margin:1.5rem auto;padding:0 1rem}
    .list{display:grid;grid-template-columns:repeat(2,1fr);gap:1rem}
    .project-card{padding:1rem;border-radius:8px;background:#fff;cursor:pointer;border:1px solid #e6edf3}
    .project-card:hover{transform:translateY(-4px);box-shadow:0 8px 20px rgba(2,6,23,0.06)}
    .meta{color:#6b7280}
    @media (max-width:800px){.list{grid-template-columns:1fr}}
    `
  ]
})
export class ProjectsComponent implements OnInit {
  projects: any[] = [];

  constructor(private api: ApiService, private state: StateService) {}

  ngOnInit() {
    this.api.getProjects().subscribe((p) => (this.projects = p));
  }

  select(p: any) {
    this.state.selectProject(p);
    alert(`Selected project: ${p.name}`);
  }
}
