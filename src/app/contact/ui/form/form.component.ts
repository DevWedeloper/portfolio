import { AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
  output,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CustomButtonComponent } from '../../../shared/ui/components/custom-button/button';
import { ContactService } from '../../data-access/contact.service';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [AsyncPipe, ReactiveFormsModule, CustomButtonComponent],
  template: `
    @if (contactForm.valueChanges | async) {}
    <form [formGroup]="contactForm" (ngSubmit)="submitForm.emit(contactForm)">
      <div class="form-item-container">
        <input
          id="name"
          type="text"
          formControlName="name"
          placeholder="Name"
          autocomplete="name"
        />
        @if (
          contactForm.get('name')?.invalid && contactForm.get('name')?.touched
        ) {
          <div class="error-tooltip">
            @if (contactForm.get('name')?.hasError('required')) {
              <div>Name is required.</div>
            }
          </div>
        }
      </div>
      <div class="form-item-container">
        <input
          id="email"
          type="email"
          formControlName="email"
          placeholder="Email"
          autocomplete="email"
        />
        @if (
          contactForm.get('email')?.invalid && contactForm.get('email')?.touched
        ) {
          <div class="error-tooltip">
            @if (contactForm.get('email')?.hasError('required')) {
              <div>Email is required.</div>
            }
            @if (contactForm.get('email')?.hasError('email')) {
              <div>Invalid email format.</div>
            }
          </div>
        }
      </div>
      <div class="form-item-container">
        <input
          id="subject"
          type="text"
          formControlName="subject"
          placeholder="Subject"
        />
      </div>
      <div class="form-item-container">
        <textarea
          id="message"
          formControlName="message"
          rows="8"
          placeholder="Message"
        ></textarea>
        @if (
          contactForm.get('message')?.invalid &&
          contactForm.get('message')?.touched
        ) {
          <div class="error-tooltip">
            @if (contactForm.get('message')?.hasError('required')) {
              <div>Message is required.</div>
            }
          </div>
        }
      </div>
      <div class="form-item-container">
        <button
          custom-button
          class="text-big"
          type="submit"
          [disabled]="contactForm.invalid || (cs.submitLoading$ | async)"
        >
          Submit
        </button>
      </div>
    </form>
  `,
  styles: [
    `
      form {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1rem;
      }

      form input,
      form textarea {
        width: 100%;
        padding: 1rem;
        border-radius: 0.5rem;
        background-color: var(--secondary-color);
        color: var(--text-color);
      }

      form input::placeholder,
      form textarea::placeholder {
        color: var(--text-color);
      }

      form textarea {
        resize: none;
      }

      form textarea::-webkit-scrollbar-track {
        background: var(--secondary-color);
      }

      form button {
        grid-column: span 1;
        width: 50%;
        padding: 1rem;
        font-size: 1.2rem;
      }

      form button:disabled {
        transform: none;
        background-color: var(--secondary-color);
        cursor: not-allowed;
      }

      .form-item-container {
        position: relative;
      }

      .form-item-container:nth-child(1) {
        grid-column: span 1;
      }

      .form-item-container:nth-child(2) {
        grid-column: span 1;
      }

      .form-item-container:nth-child(3) {
        grid-column: span 2;
      }

      .form-item-container:nth-child(4) {
        grid-column: span 2;
      }

      .form-item-container:nth-child(5) {
        grid-column: span 2;
      }

      .error-tooltip {
        position: absolute;
        bottom: calc(100% + 0.5rem);
        right: 0;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        background-color: rgba(255, 0, 0, 0.8);
        color: #fff;
        padding: 0.5rem 1rem;
        border-radius: 0.5rem;
        font-size: var(--font-size-tooltip);
        z-index: 1;
        align-items: flex-start;
        user-select: none;
      }

      @media (max-width: 991px) {
        .form-item-container:nth-child(1) {
          grid-column: span 2;
        }

        .form-item-container:nth-child(2) {
          grid-column: span 2;
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormComponent implements OnInit {
  private fb = inject(FormBuilder);
  protected cs = inject(ContactService);
  submitForm = output<FormGroup>();
  protected contactForm!: FormGroup;

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: [''],
      message: ['', Validators.required],
      date: [new Date().toISOString()],
    });
  }
}
