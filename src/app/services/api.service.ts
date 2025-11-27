import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

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

const SUPPLIERS: Supplier[] = [
  { id: 's1', name: 'GreenCut Fabrics', location: 'Bhubaneswar, India', lat: 20.2961, lng: 85.8245, rating: 88, certifications: ['ISO14001','FairTrade'] },
  { id: 's2', name: 'Bright Sew', location: 'Dhaka, Bangladesh', lat: 23.8103, lng: 90.4125, rating: 62, certifications: ['B Corp'] },
  { id: 's3', name: 'LogiMove', location: 'Dubai, UAE', lat: 25.2048, lng: 55.2708, rating: 74, certifications: [] }
];

const PASSPORTS: ProductPassport[] = [
  { id: 'pp1', productId: 'p1', serial: 'GV-2025-0001', origin: { country: 'India', city: 'Bhubaneswar', lat: 20.2961, lng: 85.8245 }, materials: ['Recycled Cotton','Biobased Dye'], certifications: ['GOTS','FairTrade'], blockchainVerified: true, sustainabilityScore: 86 },
  { id: 'pp2', productId: 'p2', serial: 'EA-2025-0002', origin: { country: 'Bangladesh', city: 'Dhaka', lat: 23.8103, lng: 90.4125 }, materials: ['Organic Cotton','Recycled PET'], certifications: ['OEKO-TEX'], blockchainVerified: false, sustainabilityScore: 72 }
];

const EMISSIONS: Record<string, EmissionPoint[]> = {
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

@Injectable({ providedIn: 'root' })
export class ApiService {
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
    return of(EMISSIONS[projectId] || []).pipe(delay(400));
  }

  getAnalytics() {
    // Return simple aggregated data useful for charts in analytics page
    const totals = Object.keys(EMISSIONS).map(key => ({
      id: key,
      total: (EMISSIONS[key] || []).reduce((s, e) => s + e.emissionsKg, 0)
    }));

    const byStage: Record<string, number> = {};
    Object.values(EMISSIONS).forEach(list => {
      list.forEach(item => {
        byStage[item.stage] = (byStage[item.stage] || 0) + item.emissionsKg;
      });
    });

    return of({ totals, byStage }).pipe(delay(400));
  }
}
