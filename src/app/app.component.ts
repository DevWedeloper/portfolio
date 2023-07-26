import { Component, HostListener, OnInit, Renderer2, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'portfolio';

  contactForm!: FormGroup;
  submitted = false;

  menuIconSrc: string = 'assets/menu.png';
  isMenuOpen: boolean = false;
  resizeTimer: any;

  constructor(
    private _formBuilder: FormBuilder,
    private _http: HttpClient,
    private renderer: Renderer2, 
    private el: ElementRef
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.addScrollAnimation();
    this.addScrollNavigationListeners();
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

  addScrollNavigationListeners(): void {
    // Scroll event for sections and navigation links
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.navbar a');
    const shapes = document.querySelectorAll('.progress li');
  
    window.addEventListener('scroll', () => {
      sections.forEach((sec, sectionIndex) => {
        const top = window.scrollY;
        const offset = sec.offsetTop - 150;
        const height = sec.offsetHeight;
        const id = sec.getAttribute('id');
        if (top >= offset && top < offset + height) {
          navLinks.forEach((links) => {
            links.classList.remove('active');
            document.querySelector(`nav ul li a[href*='${id}']`)?.classList.add('active');
          });
          shapes.forEach((shape, shapeIndex) => {
            shape.classList.remove('active');
            if (sectionIndex === shapeIndex) {
              shape.classList.add('active');
            }
          });
        }
      });
    });
  
    document.addEventListener('DOMContentLoaded', () => {
      window.addEventListener('scroll', () => {
        const scroll = window.pageYOffset || document.documentElement.scrollTop;
        const doc = Math.max(
          document.body.scrollHeight,
          document.documentElement.scrollHeight
        );
        const win = window.innerHeight || document.documentElement.clientHeight;
        const value = (scroll / (doc - win)) * 100;
        const line = document.querySelector('.line') as HTMLElement;
        line.style.height = value + '%';
      });
    });
  
  }

  addButtonEffect(): void {
  // Button effect
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

  menuOnClick(): void {
    const navbar = document.querySelector('.navbar') as HTMLElement;

    this.isMenuOpen = !this.isMenuOpen;
    this.menuIconSrc = this.isMenuOpen ? 'assets/close.png' : 'assets/menu.png';

    navbar.classList.toggle('active');
  }

  closeMenu(): void {
    const navbar = document.querySelector('.navbar') as HTMLElement;

    this.isMenuOpen = false;
    this.menuIconSrc = 'assets/menu.png';

    navbar.classList.remove('active');
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
  
  themeOnClick(): void {
    const body = document.body;
    const aboutImage = document.querySelector('.about-img') as HTMLElement;

    const themeIcons = document.querySelectorAll(".theme-icon") as NodeListOf<HTMLImageElement>;
    const githubIcon = document.getElementById("github-icon") as HTMLImageElement;
    const awsIcon = document.getElementById("aws-icon") as HTMLImageElement;

    const contactIcons = document.querySelectorAll('.adjustable-icon') as NodeListOf<HTMLImageElement>;

    body.classList.toggle("dark-theme");
    aboutImage.classList.add('blur-animation');
    
    if (body.classList.contains("dark-theme")) {
      themeIcons.forEach(icon => {
        icon.src = "assets/sun.svg";
      });
      githubIcon.src = "assets/github-light.svg";
      awsIcon.src = "assets/aws-light.svg";
      contactIcons.forEach(icon => {
        icon.style.filter = "invert(100%) grayscale(100%)";
      });
    } else {
      themeIcons.forEach(icon => {
        icon.src = "assets/moon.svg";
      });
      githubIcon.src = "assets/github-dark.svg";
      awsIcon.src = "assets/aws-dark.svg";
      contactIcons.forEach(icon => {
        icon.style.filter = "grayscale(100%)";
      });
    }
    
    aboutImage.addEventListener('animationend', () => {
      aboutImage.classList.remove('blur-animation');
    }, { once: true });
    
  }

  addTypeEffect(): void {
    const id = 'type-effect';
    const txtList: string[] = ['Software Engineer!', 'Full-stack Engineer!'];
    let i = 0;
    let currentTextIndex = 0;
    const typeSpeed = 55;
    let reverse = false;
    const reverseDelay = 1000;
  
    function typeWriter(): void {
      const element = document.getElementById(id);
      if (!element) return;
  
      const currentText = txtList[currentTextIndex];
  
      if (reverse) {
        element.innerHTML = currentText.substring(0, i);
        i--;
        if (i === -1) {
          reverse = false;
          i = 0;
          moveToNextText();
        }
      } else if (i < currentText.length) {
        element.innerHTML += currentText.charAt(i);
        i++;
        if (i === currentText.length) {
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
  
  onSubmit() {
    if (this.contactForm.invalid) {
      return;
    }

    this.submitted = true;
    this.contactForm.get('date')?.setValue(new Date().toISOString());
    const scriptURL = 'https://script.google.com/macros/s/AKfycbxtL659ZWZxJohU69yfUJCJ3Eb4Raa6vkNDK0Vgxej4NxIp5mzq-UFe32581yUwZ5QF/exec';
    const formData = new FormData();
    formData.append('name', this.contactForm.get('name')?.value);
    formData.append('email', this.contactForm.get('email')?.value);
    formData.append('subject', this.contactForm.get('subject')?.value);
    formData.append('message', this.contactForm.get('message')?.value);
    formData.append('date', this.contactForm.get('date')?.value);

    this._http.post(scriptURL, formData).subscribe(
      response => {
        this.openModal('submit-modal', 'submit-modal-content');
        this.contactForm.reset();
        this.submitted = false; 
        
      }, 
      error => {
        this.openModal('submit-error-modal', 'submit-error-modal-content');
        this.contactForm.reset();
        this.submitted = false; 
      }
    );
  }

  openModal(modalID: string, modalContent: string): void {
    const modal = document.getElementById(modalID) as HTMLElement;
    const content = document.getElementById(modalContent) as HTMLElement;
    
    modal.classList.add('open-modal');
    setTimeout(() => {
      content.classList.add('open-modal-content');
    }, 1);

  }

  closeModal(modalID: string, modalContent: string): void {
    const content = document.getElementById(modalContent) as HTMLElement;
    const modal = document.getElementById(modalID) as HTMLElement;

    modal.classList.remove('open-modal');
    content.classList.remove('open-modal-content');
  }

  modalStopPropagation(event: MouseEvent): void {
    event.stopPropagation();
  }

}
