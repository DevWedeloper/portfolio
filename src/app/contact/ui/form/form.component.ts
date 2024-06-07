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
      <div class="mb-2">
        <input
          id="name"
          type="text"
          formControlName="name"
          placeholder="Name"
          autocomplete="name"
        />
        @if (
          contactForm.get('name')?.invalid &&
          contactForm.get('name')?.touched &&
          contactForm.get('name')?.hasError('required')
        ) {
          <div class="text-red-500">Name is required.</div>
        }
      </div>
      <div class="mb-2">
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
          @if (contactForm.get('email')?.hasError('required')) {
            <div class="text-red-500">Email is required.</div>
          }
          @if (contactForm.get('email')?.hasError('email')) {
            <div class="text-red-500">Invalid email format.</div>
          }
        }
      </div>
      <div class="mb-2">
        <input
          id="subject"
          type="text"
          formControlName="subject"
          placeholder="Subject"
        />
      </div>
      <div class="mb-2">
        <textarea
          id="message"
          formControlName="message"
          rows="8"
          placeholder="Message"
        ></textarea>
        @if (
          contactForm.get('message')?.invalid &&
          contactForm.get('message')?.touched &&
          contactForm.get('message')?.hasError('required')
        ) {
          <div class="text-red-500">Message is required.</div>
        }
      </div>
      <div class="mb-2">
        <button
          custom-button
          class="w-full p-2"
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

      form button:disabled {
        transform: none;
        background-color: var(--secondary-color);
        cursor: not-allowed;
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
