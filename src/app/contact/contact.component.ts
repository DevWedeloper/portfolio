import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, ElementRef, OnInit, TemplateRef, ViewChild, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SectionService } from '../shared/data-access/section.service';
import { ThemeService } from '../shared/data-access/theme.service';
import { ModalComponent } from '../shared/ui/components/modal/modal.component';
import { ModalService } from '../shared/ui/components/modal/modal.service';

@Component({
    selector: 'app-contact',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, ModalComponent],
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactComponent implements OnInit{
  _http = inject(HttpClient);
  _formBuilder = inject(FormBuilder);
  sectionService = inject(SectionService);
  ts = inject(ThemeService);
  ms = inject(ModalService);
  @ViewChild('section', { static: true }) section!: ElementRef<HTMLElement>;
  contactForm!: FormGroup;
  submitted = false;

  ngOnInit(): void {
    this.sectionService.registerSection(this.section);
    this.initializeForm();
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
  
  //TODO, make service, refactor the observable
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
        this.ms.open(this.thankYouTemplate);
        this.contactForm.reset();
        this.submitted = false; 
        
      }, 
      error => {
        this.ms.open(this.sorryTemplate);
        this.contactForm.reset();
        this.submitted = false; 
      }
    );
  }

} 

