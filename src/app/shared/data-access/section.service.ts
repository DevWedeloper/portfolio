import { ElementRef, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SectionService {
  sections: ElementRef<HTMLElement>[] = [];

  registerSection(section: ElementRef<HTMLElement>): void {
    this.sections.push(section);
  }

  getSections(): ElementRef<HTMLElement>[] {
    return this.sections;
  }
}
