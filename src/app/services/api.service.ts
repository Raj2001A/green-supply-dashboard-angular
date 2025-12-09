import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, map, shareReplay } from 'rxjs/operators';

export interface Project {
  id: string;
  name: string;
  description: string;
  stack: string;
  latency?: number;
}

export interface Supplier {
  id: string;
  name: string;
  location: string;
  lat?: number;
  lng?: number;
  rating?: number;
  certifications?: string[];
}

export interface ProductPassport {
  id: string;
  productId: string;
  serial: string;
  origin: { country: string; city: string; lat?: number; lng?: number };
  materials: string[];
  certifications: string[];
  blockchainVerified: boolean;
  sustainabilityScore: number;
}

interface EmissionPoint {
  stage: string;
  emissionsKg: number;
  location: string;
  timestamp: string;
}

const MOCK: Project[] = [
  { id: 'p1', name: 'GreenVision', description: 'Model monitoring for energy optimization', stack: 'Angular · Node', latency: 120 },
  { id: 'p2', name: 'EcoAnnotate', description: 'Labeling UI with active learning', stack: 'Angular · Python', latency: 98 },
  { id: 'p3', name: 'CarbonTracker', description: 'Estimating carbon impact of model training', stack: 'Angular · Go', latency: 200 },
  { id: 'p4', name: 'ReUseNet', description: 'Model registry and reuse recommendations', stack: 'Angular · Java', latency: 85 }
];

const SUPPLIERS_BASE: Supplier[] = [
  { id: 's1', name: 'GreenCut Fabrics', location: 'Bhubaneswar, India', lat: 20.2961, lng: 85.8245, rating: 88, certifications: ['ISO14001','FairTrade'] },
  { id: 's2', name: 'Bright Sew', location: 'Dhaka, Bangladesh', lat: 23.8103, lng: 90.4125, rating: 62, certifications: ['B Corp'] },
  { id: 's3', name: 'LogiMove', location: 'Dubai, UAE', lat: 25.2048, lng: 55.2708, rating: 74, certifications: [] }
];

const PASSPORTS: ProductPassport[] = [
  { id: 'pp1', productId: 'p1', serial: 'GV-2025-0001', origin: { country: 'India', city: 'Bhubaneswar', lat: 20.2961, lng: 85.8245 }, materials: ['Recycled Cotton','Biobased Dye'], certifications: ['GOTS','FairTrade'], blockchainVerified: true, sustainabilityScore: 86 },
  { id: 'pp2', productId: 'p2', serial: 'EA-2025-0002', origin: { country: 'Bangladesh', city: 'Dhaka', lat: 23.8103, lng: 90.4125 }, materials: ['Organic Cotton','Recycled PET'], certifications: ['OEKO-TEX'], blockchainVerified: false, sustainabilityScore: 72 }
];

const EMISSIONS_BASE: Record<string, EmissionPoint[]> = {
  p1: [
    { stage: 'Raw Material', emissionsKg: 120, location: 'India', timestamp: '2025-01-15T08:00:00Z' },
    { stage: 'Manufacturing', emissionsKg: 450, location: 'Bangladesh', timestamp: '2025-02-10T09:00:00Z' },
    { stage: 'Distribution', emissionsKg: 230, location: 'UAE', timestamp: '2025-03-05T03:00:00Z' },
    { stage: 'Retail', emissionsKg: 80, location: 'India', timestamp: '2025-03-20T10:00:00Z' }
  ],
  p2: [
    { stage: 'Raw Material', emissionsKg: 90, location: 'India', timestamp: '2025-01-22T08:00:00Z' },
    { stage: 'Manufacturing', emissionsKg: 350, location: 'Bangladesh', timestamp: '2025-02-14T09:00:00Z' },
    { stage: 'Distribution', emissionsKg: 150, location: 'UAE', timestamp: '2025-03-07T03:00:00Z' }
  ]
};

// Programmatically extend suppliers and emissions so the mock API realistically handles
// 1000+ records while keeping base data readable above.
const SUPPLIERS: Supplier[] = (() => {
  const list: Supplier[] = [...SUPPLIERS_BASE];
  const cities = ['Bhubaneswar, India', 'Dhaka, Bangladesh', 'Dubai, UAE', 'Berlin, Germany', 'Austin, USA'];
  for (let i = 4; i <= 250; i += 1) {
    const city = cities[i % cities.length];
    list.push({
      id: `s${i}`,
      name: `Supplier ${i}`,
      location: city,
      rating: 50 + (i % 50),
      certifications: i % 3 === 0 ? ['ISO14001'] : []
    });
  }
  return list;
})();

const EMISSIONS: Record<string, EmissionPoint[]> = (() => {
  const result: Record<string, EmissionPoint[]> = { ...EMISSIONS_BASE };
  const stages = ['Raw Material', 'Manufacturing', 'Distribution', 'Retail'];
  const locations = ['India', 'Bangladesh', 'UAE', 'Germany', 'USA'];

  let counter = 0;
  for (let pIndex = 3; pIndex <= 25; pIndex += 1) {
    const projectId = `p${pIndex}`;
    const points: EmissionPoint[] = [];
    for (let i = 0; i < stages.length; i += 1) {
      counter += 1;
      const emissionsKg = 50 + ((counter * 17) % 450);
      const location = locations[(counter + i) % locations.length];
      const timestamp = new Date(2025, (counter + i) % 12, (counter % 28) + 1, 8, 0, 0).toISOString();
      points.push({ stage: stages[i], emissionsKg, location, timestamp });
    }
    result[projectId] = points;
  }

  // Ensure we have at least ~1000 emission points total.
  const ensureCount = 1000;
  const allPointsCount = Object.values(result).reduce((sum, list) => sum + list.length, 0);
  let projectIndex = 1000;
  while (Object.values(result).reduce((sum, list) => sum + list.length, 0) < ensureCount) {
    const projectId = `px-${projectIndex}`;
    const basePoints = EMISSIONS_BASE['p1'].map((p, idx) => ({
      ...p,
      emissionsKg: p.emissionsKg + ((projectIndex + idx * 13) % 120),
      timestamp: new Date(2025, (projectIndex + idx) % 12, (idx % 28) + 1, 6, 0, 0).toISOString()
    }));
    result[projectId] = basePoints;
    projectIndex += 1;
  }

  return result;
})();

@Injectable({ providedIn: 'root' })
export class ApiService {
  // Cache emissions and analytics streams so multiple subscribers reuse work.
  private emissionsCache$?: Observable<Record<string, EmissionPoint[]>>;
  private analyticsCache$?: Observable<{ totals: { id: string; total: number }[]; byStage: Record<string, number> }>;

  getProjects(): Observable<Project[]> {
    // Simulate network latency
    return of(MOCK).pipe(delay(400));
  }

  getProjectById(id: string): Observable<Project | undefined> {
    return of(MOCK.find((m) => m.id === id)).pipe(delay(250));
  }

  getSuppliers(): Observable<Supplier[]> {
    return of(SUPPLIERS).pipe(delay(300));
  }

  getProductPassport(productId: string): Observable<ProductPassport | undefined> {
    return of(PASSPORTS.find(p => p.productId === productId)).pipe(delay(300));
  }

  getEmissionsForProject(projectId: string): Observable<EmissionPoint[]> {
    if (!this.emissionsCache$) {
      this.emissionsCache$ = of(EMISSIONS).pipe(
        delay(300),
        // shareReplay ensures downstream subscribers reuse the same emission map
        shareReplay({ bufferSize: 1, refCount: false })
      );
    }

    return this.emissionsCache$.pipe(
      map((all) => all[projectId] || [])
    );
  }

  getAnalytics() {
    if (!this.analyticsCache$) {
      this.analyticsCache$ = of(EMISSIONS).pipe(
        delay(350),
        map((emissions) => {
          const totals = Object.keys(emissions).map((key) => ({
            id: key,
            total: (emissions[key] || []).reduce((s, e) => s + e.emissionsKg, 0)
          }));

          const byStage: Record<string, number> = {};
          Object.values(emissions).forEach((list) => {
            list.forEach((item) => {
              byStage[item.stage] = (byStage[item.stage] || 0) + item.emissionsKg;
            });
          });

          return { totals, byStage };
        }),
        // Cache analytics calculations across the app
        shareReplay({ bufferSize: 1, refCount: false })
      );
    }

    return this.analyticsCache$;
  }
}
