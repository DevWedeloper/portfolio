import { Component, ElementRef, OnDestroy, OnInit, Renderer2, TemplateRef, ViewChild } from '@angular/core';
import { ModalComponent } from '../shared/ui/components/modal/modal.component';
import { SectionService } from '../services/section.service';
import { ThemeService } from '../services/theme.service';
import { trigger, state, style, animate, keyframes, transition } from '@angular/animations';
import { Subscription } from 'rxjs';
import { TooltipDirective } from '../directives/tooltip.directive';
import { NgStyle, NgTemplateOutlet } from '@angular/common';
import { HighlightTextDirective } from '../directives/highlight-text.directive';
import { TabsComponent } from '../components/tabs/tabs.component';
@Component({
    selector: 'app-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.scss'],
    animations: [
        trigger('blurAnimation', [
            state('animated', style({ filter: 'blur(0)' })),
            transition('* => animated', [
                animate('0.7s ease-in-out', keyframes([
                    style({ filter: 'blur(0)', offset: 0 }),
                    style({ filter: 'blur(2px)', offset: 0.5 }),
                    style({ filter: 'blur(0)', offset: 1 }),
                ]))
            ])
        ])
    ],
    standalone: true,
    imports: [TabsComponent, HighlightTextDirective, NgStyle, TooltipDirective, ModalComponent, NgTemplateOutlet]
})
export class AboutComponent implements OnInit, OnDestroy {
  @ViewChild('section', { static: true }) section!: ElementRef<HTMLElement>;
  @ViewChild('aboutImg', { static: true }) aboutImg!: ElementRef<HTMLElement>;
  @ViewChild('line', { static: true }) line!: ElementRef<HTMLElement>;
 
  blurAnimationState:string = '';

  themeSubscription!: Subscription

  tabs: string[] = ['Skills', 'Experience', 'Education'];
  activatedTab: string = 'Skills';

  constructor(
    private themeService: ThemeService,
    private sectionService: SectionService
  ) {}

  ngOnInit(): void {
    this.sectionService.registerSection(this.section);
    this.themeSubscription = this.themeService.isDarkMode$.subscribe((isDarkMode) => {
      this.triggerAnimation();
    });
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
  
  triggerAnimation(): void {
    this.blurAnimationState = 'animated';
    setTimeout(() => {
      this.blurAnimationState = '';
    }, 700)
  }

  tabChange(tabIndex: string) {
    this.activatedTab = tabIndex;
  }

  @ViewChild('modalRef') modalRef!: ModalComponent; 
  modalContent!: TemplateRef<any>;
  openModal(templateRef: TemplateRef<any>): void {
    this.modalContent = templateRef;
    this.modalRef.openModal();
  }

  closeModal(): void {
    this.modalRef.closeModal();
  }

  isDarkMode(): boolean {
    return this.themeService.getIsDarkMode();
  }

}
