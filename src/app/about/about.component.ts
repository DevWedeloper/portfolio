import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ModalComponent } from 'src/components/modal/modal.component';
import { SectionService } from 'src/services/section.service';
import { SharedService } from 'src/services/shared.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  @ViewChild('section', { static: true }) section!: ElementRef<HTMLElement>;

  constructor(
    private sharedService: SharedService,
    private sectionService: SectionService,
    private el: ElementRef
  ) {}

  ngOnInit(): void {
    this.sectionService.registerSection(this.section);
    this.addTabAndLineListeners();
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
    return this.sharedService.getIsDarkMode();
  }

  addTabAndLineListeners(): void {
    const tabs = Array.from(document.querySelectorAll('.tab-links')) as HTMLElement[];
    const line = document.querySelector('.tab-line') as HTMLElement;
    const tabContent = Array.from(document.getElementsByClassName('tab-content')) as HTMLElement[];

    function updateTabLine() {
      const activeTab = document.querySelector('.tab-links.active') as HTMLElement;
      if (activeTab) {
        line.style.width = activeTab.offsetWidth + "px";
        line.style.left = activeTab.offsetLeft + "px";
        line.style.top = activeTab.offsetHeight + "px";
      }
    }

    function adjustTabLinePosition(): void {
      const initialActiveTab = document.querySelector('.tab-links.active') as HTMLElement;
      if (initialActiveTab) {
        line.style.width = initialActiveTab.offsetWidth + "px";
        line.style.left = initialActiveTab.offsetLeft + "px";
        line.style.top = initialActiveTab.offsetHeight + "px";
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
