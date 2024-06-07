import {
  Injectable,
  RendererFactory2,
  afterNextRender,
  inject,
} from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private rendererFactory = inject(RendererFactory2);
  private renderer = this.rendererFactory.createRenderer(null, null);
  private darkThemeMediaQuery!: MediaQueryList;
  darkMode$ = new BehaviorSubject<boolean>(true);
  isDarkMode$: Observable<boolean> = this.darkMode$.asObservable();

  constructor() {
    afterNextRender(() => {
      this.darkThemeMediaQuery = matchMedia('(prefers-color-scheme: dark)');
      this.checkPreferredTheme();
    });
  }

  themeOnClick(): void {
    this.darkMode$.next(!this.darkMode$.value);
    const preferredTheme = this.darkMode$.value ? 'dark' : 'light';
    const isDarkTheme = this.darkMode$.value;

    if (isDarkTheme) this.renderer.addClass(document.documentElement, 'dark');
    else this.renderer.removeClass(document.documentElement, 'dark');

    localStorage.setItem('preferredTheme', preferredTheme);
  }

  checkPreferredTheme(): void {
    const preferredTheme = localStorage.getItem('preferredTheme');
    const isDarkTheme =
      preferredTheme === 'dark' ||
      (preferredTheme === null && this.darkThemeMediaQuery.matches);
    this.darkMode$.next(isDarkTheme);
  }
}
