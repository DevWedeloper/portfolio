import { Component, HostListener, OnInit, Renderer2, ElementRef, ViewChild, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ModalComponent } from 'src/components/modal/modal.component';
import { SharedService } from 'src/services/shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'portfolio';

  contactForm!: FormGroup;
  submitted = false;
  resizeTimer: any;

  constructor(
    private _formBuilder: FormBuilder,
    private _http: HttpClient,
    private renderer: Renderer2, 
    private el: ElementRef,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.addScrollAnimation();
    this.addTypeEffect();
    this.addButtonEffect();
    this.addTabAndLineListeners();
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize(event: Event): void {
    const navbar = this.el.nativeElement.querySelector('.navbar');
    this.renderer.addClass(navbar, 'resize-animation-stopper');

    clearTimeout(this.resizeTimer);
    this.resizeTimer = setTimeout(() => {
      this.renderer.removeClass(navbar, 'resize-animation-stopper');
    }, 1);
  }

  isDarkMode(): boolean {
    return this.sharedService.getIsDarkMode();
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

  initializeForm(): void {
    this.contactForm = this._formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: [''],
      message: ['', Validators.required],
      date: [new Date().toISOString()]
    });
  }

  addScrollAnimation(): void {
    type Options = {
      threshold: number;
      rootMargin: string;
    };
    
    const appearOptions: Options = {
      threshold: 0,
      rootMargin: "0px 0px -150px 0px"
    };

    const appearOnScroll = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
          appearOnScroll.unobserve(entry.target);
        } else {
          return;
        }
      });
    }, appearOptions);

    const elements = document.querySelectorAll('.hidden');
    elements.forEach((element) => appearOnScroll.observe(element));
  }

  addButtonEffect(): void {
  const buttons =  Array.from(document.querySelectorAll('.btn-effect')) as HTMLElement[];

  buttons.forEach(button => {
    button.addEventListener("click", (event) => {
      event.preventDefault
      button.classList.add("animate");
      setTimeout(() => {
        button.classList.remove("animate");
      }, 600);
      });
    });
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

  scrollToElement(targetElement: string) {
    const element = document.querySelector(targetElement);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
  
  @HostListener('click', ['$event'])
  onClick(event: Event) {
    const target = event.target as HTMLAnchorElement;
    if (target.tagName === 'A' && target.closest('.navbar')) {
      event.preventDefault();
      const targetElement = target.getAttribute('href');
      if (targetElement) {
        this.scrollToElement(targetElement);
      }
    }
  }  

  addTypeEffect(): void {
    const id = 'type-effect';
    const txtList: string[] = ['Software Engineer!', 'Full-stack Engineer!'];
    let index = 0;
    let currentTextIndex = 0;
    const typeSpeed = 55;
    let reverse = false;
    const reverseDelay = 1000;
  
    function typeWriter(): void {
      const element = document.getElementById(id);
      if (!element) return;
  
      const currentText = txtList[currentTextIndex];
  
      if (reverse) {
        element.innerHTML = currentText.substring(0, index);
        index--;
        if (index === -1) {
          reverse = false;
          index = 0;
          moveToNextText();
        }
      } else if (index < currentText.length) {
        element.innerHTML += currentText.charAt(index);
        index++;
        if (index === currentText.length) {
          setTimeout(() => {
            reverse = true;
            typeWriter();
          }, reverseDelay);
          return;
        }
      }
      setTimeout(typeWriter, typeSpeed);
    }
  
    function moveToNextText(): void {
      currentTextIndex++;
      if (currentTextIndex === txtList.length) {
        currentTextIndex = 0;
      }
    }
  
    typeWriter();
  }

  copyText(copyID: string, btnID: string): void {
    const textElement = document.getElementById(copyID) as HTMLParagraphElement;
    const textToCopy = textElement.textContent || "";
    const copyBtnSpan = document.getElementById(btnID) as HTMLSpanElement;
    const buttonImage = copyBtnSpan.querySelector("img") as HTMLImageElement;
  
    const tempTextArea = document.createElement("textarea");
    tempTextArea.value = textToCopy;
    document.body.appendChild(tempTextArea);
  
    tempTextArea.select();
    document.execCommand("copy");
  
    document.body.removeChild(tempTextArea);
  
    buttonImage.src = "assets/check.png";
  
    copyBtnSpan.style.backgroundColor = "var(--main-color)";
  
    copyBtnSpan.removeAttribute("id");
  
    setTimeout(() => {
      buttonImage.src = "assets/copy.png";
      copyBtnSpan.style.backgroundColor = "";
  
      copyBtnSpan.setAttribute("id", btnID);
    }, 2000);
  }
  
  @ViewChild('thankYouTemplate') thankYouTemplate!: TemplateRef<any>;
  @ViewChild('sorryTemplate') sorryTemplate!: TemplateRef<any>;
  onSubmit() {
    if (this.contactForm.invalid) {
      return;
    }

    this.submitted = true;
    this.contactForm.get('date')?.setValue(new Date().toISOString());
    const scriptURL = 'shttps://script.google.com/macros/s/AKfycbxtL659ZWZxJohU69yfUJCJ3Eb4Raa6vkNDK0Vgxej4NxIp5mzq-UFe32581yUwZ5QF/exec';
    const formData = new FormData();
    formData.append('name', this.contactForm.get('name')?.value);
    formData.append('email', this.contactForm.get('email')?.value);
    formData.append('subject', this.contactForm.get('subject')?.value);
    formData.append('message', this.contactForm.get('message')?.value);
    formData.append('date', this.contactForm.get('date')?.value);

    this._http.post(scriptURL, formData).subscribe(
      response => {
        this.openModal(this.thankYouTemplate);
        this.contactForm.reset();
        this.submitted = false; 
        
      }, 
      error => {
        this.openModal(this.sorryTemplate);
        this.contactForm.reset();
        this.submitted = false; 
      }
    );
  }

}
