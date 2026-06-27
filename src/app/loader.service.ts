import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private loadingSubject$ = new BehaviorSubject<boolean>(false);

  public loading$: Observable<boolean> = this.loadingSubject$.asObservable();

  showLoader() {
    this.loadingSubject$.next(true);
  }

  hideLoader() {
    this.loadingSubject$.next(false);
  }
}
