import { AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
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

const input =
  'w-full rounded-lg bg-secondary-color p-4 text-text-color placeholder:text-text-color';

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
          class="${input}"
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
          class="${input}"
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
          class="${input}"
        />
        @if (
          contactForm.get('subject')?.invalid &&
          contactForm.get('subject')?.touched &&
          contactForm.get('subject')?.hasError('required')
        ) {
          <div class="text-red-500">Subject is required.</div>
        }
      </div>
      <div class="mb-2">
        <textarea
          id="message"
          formControlName="message"
          rows="8"
          placeholder="Message"
          class="resize-none"
          class="${input}"
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
          class="w-full p-2 disabled:pointer-events-none disabled:transform-none disabled:cursor-not-allowed"
          type="submit"
          [disabled]="contactForm.invalid || (cs.submitLoading$ | async)"
        >
          Submit
        </button>
      </div>
    </form>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormComponent {
  private fb = inject(FormBuilder);
  protected cs = inject(ContactService);
  submitForm = output<FormGroup>();
  protected contactForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    subject: ['', [Validators.required]],
    message: ['', Validators.required],
    date: [new Date().toISOString()],
  });
}
