import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  OnInit,
  TemplateRef,
  ViewChild,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { SectionService } from '../shared/data-access/section.service';
import { ThemeService } from '../shared/data-access/theme.service';
import { ModalComponent } from '../shared/ui/components/modal/modal.component';
import { ModalService } from '../shared/ui/components/modal/modal.service';
import { ContactService } from './data-access/contact.service';
import { CopyTextComponent } from './ui/copy-text/copy-text.component';
import { FeedbackFailComponent } from './ui/feedback-fail/feedback-fail.component';
import { FeedbackSuccessComponent } from './ui/feedback-success/feedback-success.component';
import { FormComponent } from './ui/form/form.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ModalComponent,
    FormComponent,
    CopyTextComponent,
    FeedbackSuccessComponent,
    FeedbackFailComponent
  ],
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
  elementRef = inject(ElementRef);
  @ViewChild('thankYouTemplate') thankYouTemplate!: TemplateRef<HTMLElement>;
  @ViewChild('sorryTemplate') sorryTemplate!: TemplateRef<HTMLElement>;
  @HostBinding('attr.id') id = 'contact';
  @HostBinding('class.section') wrapperClass = true;
  email = 'vicnathangabrielle@gmail.com';
  phoneNumber = '+63 965 558 5778';

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
    this.ss.registerSection(this.elementRef);
  }
}
