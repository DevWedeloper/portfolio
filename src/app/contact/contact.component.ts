import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnInit,
  TemplateRef,
  ViewChild,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FormBuilder,
  ReactiveFormsModule
} from '@angular/forms';
import { SectionService } from '../shared/data-access/section.service';
import { ThemeService } from '../shared/data-access/theme.service';
import { ModalComponent } from '../shared/ui/components/modal/modal.component';
import { ModalService } from '../shared/ui/components/modal/modal.service';
import { ContactService } from './data-access/contact.service';
import { FormComponent } from './ui/form/form.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ModalComponent, FormComponent],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactComponent implements OnInit {
  fb = inject(FormBuilder);
  ss = inject(SectionService);
  ts = inject(ThemeService);
  ms = inject(ModalService);
  cs = inject(ContactService);
  @ViewChild('section', { static: true }) section!: ElementRef<HTMLElement>;
  @ViewChild('thankYouTemplate') thankYouTemplate!: TemplateRef<HTMLElement>;
  @ViewChild('sorryTemplate') sorryTemplate!: TemplateRef<HTMLElement>;

  constructor() {
    this.cs.submitData$.pipe(takeUntilDestroyed()).subscribe({
      next: () => {
        this.ms.open(this.thankYouTemplate);
      },
      error: () => {
        this.ms.open(this.sorryTemplate);
      },
    });
  }

  ngOnInit(): void {
    this.ss.registerSection(this.section);
  }

  copyText(copyID: string, btnID: string): void {
    const textElement = document.getElementById(copyID) as HTMLParagraphElement;
    const textToCopy = textElement.textContent || '';
    const copyBtnSpan = document.getElementById(btnID) as HTMLSpanElement;
    const buttonImage = copyBtnSpan.querySelector('img') as HTMLImageElement;

    const tempTextArea = document.createElement('textarea');
    tempTextArea.value = textToCopy;
    document.body.appendChild(tempTextArea);

    tempTextArea.select();
    document.execCommand('copy');

    document.body.removeChild(tempTextArea);

    buttonImage.src = 'assets/images/icons/check.svg';

    copyBtnSpan.style.backgroundColor = 'var(--main-color)';

    copyBtnSpan.removeAttribute('id');

    setTimeout(() => {
      buttonImage.src = 'assets/images/icons/copy.svg';
      copyBtnSpan.style.backgroundColor = '';

      copyBtnSpan.setAttribute('id', btnID);
    }, 2000);
  }
}
