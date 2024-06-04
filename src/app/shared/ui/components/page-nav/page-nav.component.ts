import { isPlatformServer } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  PLATFORM_ID,
  computed,
  inject,
  isDevMode,
  signal,
} from '@angular/core';
import {
  takeUntilDestroyed,
  toObservable,
  toSignal,
} from '@angular/core/rxjs-interop';
import { Observable, filter } from 'rxjs';

export const sections = signal<{ id: string; isActive: boolean }[] | null>(
  null,
);

@Component({
  selector: 'app-page-nav',
  standalone: true,
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageNavComponent implements OnDestroy {
  protected readonly isDevMode = signal(isDevMode());

  private readonly platformId = inject(PLATFORM_ID);

  /**
   * Reference to the tag with the main content of the page.
   * For this to work, the component should be added immediately after a tag with the [appMainSection] directive.
   */
  private page: HTMLElement = (inject(ElementRef).nativeElement as HTMLElement)
    .previousSibling as HTMLElement;

  private getSections = computed(() => {
    if (isPlatformServer(this.platformId)) {
      if (isDevMode()) {
        console.error(
          'This component should not be used for non-SSG/SPA pages.',
        );
      }
      return;
    }

    const selectors = ['[appMainSection]'];
    const headings = Array.from(
      this.page.querySelectorAll(selectors.join(',')),
    );

    return headings;
  });

  private getActiveSection = toSignal(
    new Observable<string>((subscriber) => {
      if (typeof IntersectionObserver === 'undefined') return;

      const activeSectionObserver = new IntersectionObserver(
        (entries) =>
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              subscriber.next(entry.target.id);
            }
          }),
        {
          rootMargin: '0px 0px -70% 0px',
        },
      );

      this.getSections()?.forEach((element) =>
        activeSectionObserver.observe(element),
      );

      subscriber.add(() => activeSectionObserver.disconnect());
    }),
  );

  protected sections = computed(() => {
    const sections = this.getSections()?.map((element) => {
      const { id } = element;
      return { id, isActive: id === this.getActiveSection() };
    });
    return sections;
  });

  constructor() {
    toObservable(this.sections)
      .pipe(filter(Boolean), takeUntilDestroyed())
      .subscribe((value) => {
        sections.set(value);
      });
  }

  ngOnDestroy(): void {
    sections.set(null);
  }
}
