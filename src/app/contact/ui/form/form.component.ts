import { CommonModule } from '@angular/common';
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
  imports: [CommonModule, ReactiveFormsModule, CustomButtonComponent],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
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
