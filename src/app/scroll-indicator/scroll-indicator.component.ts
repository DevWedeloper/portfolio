import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnInit,
  inject
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BehaviorSubject, fromEvent } from 'rxjs';
import { tap } from 'rxjs/operators';
import { SectionService } from 'src/app/shared/data-access/section.service';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-scroll-indicator',
  templateUrl: './scroll-indicator.component.html',
  styleUrls: ['./scroll-indicator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScrollIndicatorComponent implements OnInit {
  ss = inject(SectionService);
  sections!: ElementRef[];
  progress = new BehaviorSubject<number>(0);
  activeShapeIndex: number | null = null;

  constructor() {
    fromEvent(window, 'scroll')
      .pipe(
        tap(() => {
          const scroll = window.scrollY || document.documentElement.scrollTop;
          const doc = Math.max(
            document.body.scrollHeight,
            document.documentElement.scrollHeight
          );
          const win = window.innerHeight || document.documentElement.clientHeight;
      
          this.sections.forEach((sec, index) => {
            const top = window.scrollY;
            const offset = sec.nativeElement.offsetTop - 150;
            const height = sec.nativeElement.offsetHeight;
      
            this.progress.next((scroll / (doc - win)) * 100);
      
            if (top >= offset && top < offset + height) {
              this.activeShapeIndex = index;
            }
          });
        }),
        takeUntilDestroyed()
      )
      .subscribe();
  }

  ngOnInit(): void {
    this.sections = this.ss.getSections();
    const scrollPosition =
      window.pageYOffset || document.documentElement.scrollTop;
    if (scrollPosition === 0) {
      this.activeShapeIndex = 0;
    }
  }
}
