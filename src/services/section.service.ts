import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SectionService {
  private sections: HTMLElement[] = [];

  registerSection(section: HTMLElement): void {
    this.sections.push(section);
  }

  getSections(): HTMLElement[] {
    return this.sections;
  }
}
