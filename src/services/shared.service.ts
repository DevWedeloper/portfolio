import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private isDarkMode: boolean = false;

  getIsDarkMode(): boolean {
    return this.isDarkMode;
  }

  setIsDarkMode(value: boolean): void {
    this.isDarkMode = value;
  }
}
