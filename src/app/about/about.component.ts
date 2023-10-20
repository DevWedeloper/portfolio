import {
  animate,
  keyframes,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
  inject
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Subscription } from 'rxjs';
import { SectionService } from '../shared/data-access/section.service';
import { ThemeService } from '../shared/data-access/theme.service';
import { ModalComponent } from '../shared/ui/components/modal/modal.component';
import { ModalService } from '../shared/ui/components/modal/modal.service';
import { TabsComponent } from '../shared/ui/components/tabs/tabs.component';
import { TooltipDirective } from '../shared/ui/components/tooltip/tooltip.directive';
import { HighlightTextDirective } from '../shared/ui/directives/highlight-text.directive';
@Component({
  selector: 'app-about',
  standalone: true,
  imports: [
    CommonModule,
    TabsComponent,
    HighlightTextDirective,
    TooltipDirective,
    ModalComponent,
  ],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  animations: [
    trigger('blurAnimation', [
      state('animated', style({ filter: 'blur(0)' })),
      transition('* => animated', [
        animate(
          '0.7s ease-in-out',
          keyframes([
            style({ filter: 'blur(0)', offset: 0 }),
            style({ filter: 'blur(2px)', offset: 0.5 }),
            style({ filter: 'blur(0)', offset: 1 }),
          ])
        ),
      ]),
    ]),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutComponent implements OnInit, OnDestroy {
  ts = inject(ThemeService);
  sectionService = inject(SectionService);
  ms = inject(ModalService);
  @ViewChild('section', { static: true }) section!: ElementRef<HTMLElement>;
  @ViewChild('aboutImg', { static: true }) aboutImg!: ElementRef<HTMLElement>;
  @ViewChild('line', { static: true }) line!: ElementRef<HTMLElement>;

  blurAnimationState: string = '';

  themeSubscription!: Subscription;

  tabs: string[] = ['Skills', 'Experience', 'Education'];
  activatedTab: string = 'Skills';

  constructor() {
    this.themeSubscription = this.ts.isDarkMode$
      .pipe(takeUntilDestroyed())
      .subscribe(() => {
        this.triggerAnimation();
      });
  }

  ngOnInit(): void {
    this.sectionService.registerSection(this.section);
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }

  triggerAnimation(): void {
    this.blurAnimationState = 'animated';
    setTimeout(() => {
      this.blurAnimationState = '';
    }, 700);
  }

  tabChange(tabIndex: string) {
    this.activatedTab = tabIndex;
  }
}
