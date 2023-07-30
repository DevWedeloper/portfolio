import { Component, ElementRef, OnInit, Renderer2, TemplateRef, ViewChild } from '@angular/core';
import { ModalComponent } from '../components/modal/modal.component';
import { SectionService } from '../services/section.service';
import { ThemeService } from '../services/theme.service';
import { trigger, state, style, animate, keyframes, transition } from '@angular/animations';

@Component({
  selector: 'app-about',
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
        )
      ])
    ])
  ]
})
export class AboutComponent implements OnInit {
  @ViewChild('section', { static: true }) section!: ElementRef<HTMLElement>;
  @ViewChild('aboutImg', { static: true }) aboutImg!: ElementRef<HTMLElement>;
  @ViewChild('line', { static: true }) line!: ElementRef<HTMLElement>;
 
  blurAnimationState:string = '';

  constructor(
    private themeService: ThemeService,
    private sectionService: SectionService,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.sectionService.registerSection(this.section);
    this.addTabAndLineListeners();
    this.themeService.isDarkMode$.subscribe((isDarkMode) => {
      this.triggerAnimation();
    });
  }
  
  triggerAnimation(): void {
    this.blurAnimationState = 'animated';
    setTimeout(() => {
      this.blurAnimationState = '';
    }, 700)
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

  addTabAndLineListeners(): void {
    const tabs = Array.from(document.querySelectorAll('.tab-links')) as HTMLElement[];
    const tabContent = Array.from(document.getElementsByClassName('tab-content')) as HTMLElement[];

    const updateTabLine = () => {
      const activeTab = document.querySelector('.tab-links.active') as HTMLElement;
      if (activeTab) {
        this.line.nativeElement.style.width = activeTab.offsetWidth + "px";
        this.line.nativeElement.style.left = activeTab.offsetLeft + "px";
        this.line.nativeElement.style.top = activeTab.offsetHeight + "px";
      }
    }

    const adjustTabLinePosition = () => {
      const initialActiveTab = document.querySelector('.tab-links.active') as HTMLElement;
      if (initialActiveTab) {
        this.line.nativeElement.style.width = initialActiveTab.offsetWidth + "px";
        this.line.nativeElement.style.left = initialActiveTab.offsetLeft + "px";
        this.line.nativeElement.style.top = initialActiveTab.offsetHeight + "px";
      }
    }

    tabs.forEach((tab, index) => tab.addEventListener('click', (event) => {
      tabs.forEach((tab) => tab.classList.remove('active'));
      const clickedTab = event.currentTarget as HTMLElement;
      clickedTab.classList.add('active');
      tabContent.forEach((tab) => {tab.classList.remove('active')});
      tabContent[index].classList.add('active');
      updateTabLine.bind(this)();
    }));

    window.addEventListener('resize', updateTabLine.bind(this));

    adjustTabLinePosition();
  }

}
