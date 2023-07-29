import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private isDarkModeSubject = new BehaviorSubject<boolean>(false);
  isDarkMode$: Observable<boolean> = this.isDarkModeSubject.asObservable();

  getIsDarkMode(): boolean {
    return this.isDarkModeSubject.value;
  }

  setIsDarkMode(value: boolean): void {
    this.isDarkModeSubject.next(value);
  }
}
