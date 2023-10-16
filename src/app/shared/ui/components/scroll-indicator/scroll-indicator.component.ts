import { Component, ElementRef, HostListener, OnDestroy, OnInit } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { throttleTime } from 'rxjs/operators';
import { SectionService } from 'src/app/shared/data-access/section.service';
import { NgFor, NgClass } from '@angular/common';

@Component({
    selector: 'app-scroll-indicator',
    templateUrl: './scroll-indicator.component.html',
    styleUrls: ['./scroll-indicator.component.scss'],
    standalone: true,
    imports: [NgFor, NgClass]
})
export class ScrollIndicatorComponent implements OnInit, OnDestroy {
  shapes: number[] = [];
  sections!: ElementRef[];
  progress: number = 0;
  activeShapeIndex: number | null = null; 

  private scrollSubscription!: Subscription | undefined;

  constructor(
    private sectionService: SectionService
  ) {}

  ngOnInit(): void {
    this.sections = this.sectionService.getSections();
    this.shapes = Array.from({ length: this.sections.length }, (_, index) => index + 1);
    this.subscribeToScrollEvents();
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollPosition === 0) {
      this.activeShapeIndex = 0;
    }
  }

  ngOnDestroy(): void {
    if (this.scrollSubscription) {
      this.scrollSubscription.unsubscribe();
    }
  }

  private subscribeToScrollEvents(): void {
    this.scrollSubscription = fromEvent(window, 'scroll')
      .pipe(throttleTime(10))
      .subscribe(this.updateShapesAndProgressBar);
  }

  private unsubscribeFromScrollEvents(): void {
    if (this.scrollSubscription) {
      this.scrollSubscription.unsubscribe();
      this.scrollSubscription = undefined;
    }
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize(event: Event): void {
    const viewportWidth = (event.target as Window).innerWidth;
    if (viewportWidth <= 991) {
      this.unsubscribeFromScrollEvents();
    } else {
      if (!this.scrollSubscription) {
        this.subscribeToScrollEvents();
        this.updateShapesAndProgressBar();
      }
    }
  }

  private updateShapesAndProgressBar = () => {
    const scroll = window.pageYOffset || document.documentElement.scrollTop;
    const doc = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
    const win = window.innerHeight || document.documentElement.clientHeight;
    
    this.sections.forEach((sec, index) => {
      const top = window.scrollY;
      const offset = sec.nativeElement.offsetTop - 150;
      const height = sec.nativeElement.offsetHeight;

      this.progress = (scroll / (doc - win)) * 100;
    
      if (top >= offset && top < offset + height) {
        this.activeShapeIndex = index;
      }
    });
  };
  
}
