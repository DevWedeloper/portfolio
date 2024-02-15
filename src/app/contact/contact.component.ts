import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnInit,
  TemplateRef,
  inject,
  viewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ReactiveFormsModule } from '@angular/forms';
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
    FeedbackFailComponent,
  ],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.id]': '\'contact\'',
    '[class.section]': 'true',
  },
})
export class ContactComponent implements OnInit {
  private ss = inject(SectionService);
  protected ts = inject(ThemeService);
  private ms = inject(ModalService);
  protected cs = inject(ContactService);
  private elementRef = inject(ElementRef);
  private thankYouTemplate =
    viewChild.required<TemplateRef<HTMLElement>>('thankYouTemplate');
  private sorryTemplate =
    viewChild.required<TemplateRef<HTMLElement>>('sorryTemplate');
  protected email = 'vicnathangabrielle@gmail.com';
  protected phoneNumber = '+63 965 558 5778';

  constructor() {
    this.cs.submitData$.pipe(takeUntilDestroyed()).subscribe({
      next: () => {
        this.ms.open(this.thankYouTemplate());
      },
      error: () => {
        this.ms.open(this.sorryTemplate());
      },
    });
  }

  ngOnInit(): void {
    this.ss.registerSection(this.elementRef);
  }
}
