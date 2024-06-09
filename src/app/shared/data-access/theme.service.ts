import { MediaMatcher } from '@angular/cdk/layout';
import { isPlatformBrowser } from '@angular/common';
import {
  Injectable,
  PLATFORM_ID,
  RendererFactory2,
  inject,
} from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private _platformId = inject(PLATFORM_ID);
  private renderer = inject(RendererFactory2).createRenderer(null, null);
  private darkThemeMediaQuery = inject(MediaMatcher).matchMedia(
    '(prefers-color-scheme: dark)',
  );
  darkMode$ = new BehaviorSubject<boolean>(true);
  isDarkMode$: Observable<boolean> = this.darkMode$.asObservable();

  constructor() {
    this.darkThemeMediaQuery.onchange = (event: MediaQueryListEvent) =>
      this.darkMode$.next(event.matches ? true : false);
    this.syncInitialStateFromLocalStorage();
  }

  themeOnClick(): void {
    this.darkMode$.next(!this.darkMode$.value);
    const preferredTheme = this.darkMode$.value ? 'dark' : 'light';
    const isDarkTheme = this.darkMode$.value;

    if (isDarkTheme) this.renderer.addClass(document.documentElement, 'dark');
    else this.renderer.removeClass(document.documentElement, 'dark');

    localStorage.setItem('preferredTheme', preferredTheme);
  }

  private syncInitialStateFromLocalStorage(): void {
    if (isPlatformBrowser(this._platformId)) {
      const preferredTheme = localStorage.getItem('preferredTheme');
      const isDarkTheme =
        preferredTheme === 'dark' ||
        (preferredTheme === null && this.darkThemeMediaQuery.matches);
      this.darkMode$.next(isDarkTheme);
    }
  }
}
