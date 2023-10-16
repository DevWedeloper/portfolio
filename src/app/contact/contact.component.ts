import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ModalComponent } from '../shared/ui/components/modal/modal.component';
import { SectionService } from '../services/section.service';
import { ThemeService } from '../services/theme.service';
import { NgStyle, NgIf, NgTemplateOutlet } from '@angular/common';

@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.scss'],
    standalone: true,
    imports: [NgStyle, ReactiveFormsModule, NgIf, ModalComponent, NgTemplateOutlet]
})
export class ContactComponent implements OnInit{
  @ViewChild('section', { static: true }) section!: ElementRef<HTMLElement>;
  contactForm!: FormGroup;
  submitted = false;
  
  constructor(
    private _http: HttpClient,
    private _formBuilder: FormBuilder,
    private themeService: ThemeService,
    private sectionService: SectionService
  ) {}

  ngOnInit(): void {
    this.sectionService.registerSection(this.section);
    this.initializeForm();
  }

  isDarkMode(): boolean {
    return this.themeService.getIsDarkMode();
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
  
    buttonImage.src = "assets/images/icons/check.svg";
  
    copyBtnSpan.style.backgroundColor = "var(--main-color)";
  
    copyBtnSpan.removeAttribute("id");
  
    setTimeout(() => {
      buttonImage.src = "assets/images/icons/copy.svg";
      copyBtnSpan.style.backgroundColor = "";
  
      copyBtnSpan.setAttribute("id", btnID);
    }, 2000);
  }
  
  @ViewChild('thankYouTemplate') thankYouTemplate!: TemplateRef<HTMLElement>;
  @ViewChild('sorryTemplate') sorryTemplate!: TemplateRef<HTMLElement>;
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

