import {
  Injectable,
  Renderer2,
  RendererFactory2,
  afterNextRender,
  inject,
} from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private renderer: Renderer2;
  private rendererFactory = inject(RendererFactory2);
  private darkThemeMediaQuery!: MediaQueryList;
  darkMode$ = new BehaviorSubject<boolean>(true);
  isDarkMode$: Observable<boolean> = this.darkMode$.asObservable();

  constructor() {
    this.renderer = this.rendererFactory.createRenderer(null, null);
    afterNextRender(() => {
      this.darkThemeMediaQuery = window.matchMedia(
        '(prefers-color-scheme: dark)',
      );
    });
  }

  themeOnClick(): void {
    this.darkMode$.next(!this.darkMode$.value);
    if (this.darkMode$.value) {
      this.renderer.addClass(document.body, 'dark-theme');
      localStorage.setItem('preferredTheme', 'dark');
    } else {
      this.renderer.removeClass(document.body, 'dark-theme');
      localStorage.setItem('preferredTheme', 'light');
    }
  }

  checkPreferredTheme(): void {
    const preferredTheme = localStorage.getItem('preferredTheme');
    if (
      preferredTheme === 'dark' ||
      (preferredTheme === null && this.darkThemeMediaQuery.matches)
    ) {
      this.darkMode$.next(true);
      this.renderer.addClass(document.body, 'dark-theme');
    } else {
      this.darkMode$.next(false);
      this.renderer.removeClass(document.body, 'dark-theme');
    }
  }
}
