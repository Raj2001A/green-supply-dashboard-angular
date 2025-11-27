import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class StateService {
  private _selected = new BehaviorSubject<any | null>(null);
  selected$ = this._selected.asObservable();

  selectProject(p: any) {
    this._selected.next(p);
  }
}
