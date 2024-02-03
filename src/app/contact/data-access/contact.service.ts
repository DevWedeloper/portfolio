import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  BehaviorSubject,
  Subject,
  catchError,
  finalize,
  of,
  switchMap,
  tap,
  throwError,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  http = inject(HttpClient);
  fb = inject(FormBuilder);
  private readonly scriptURL =
    'https://script.google.com/macros/s/AKfycbxtL659ZWZxJohU69yfUJCJ3Eb4Raa6vkNDK0Vgxej4NxIp5mzq-UFe32581yUwZ5QF/exec';
  // private readonly scriptURL = 'WRONGSCRIPTFORTESTONLY';
  submitForm$ = new Subject<FormGroup>();
  submitLoading$ = new BehaviorSubject<boolean>(false);
  submitData$ = this.submitForm$.pipe(
    tap(() => this.submitLoading$.next(true)),
    switchMap((form) => {
      form.get('date')?.setValue(new Date().toISOString());
      const formData = new FormData();
      formData.append('name', form.get('name')?.value);
      formData.append('email', form.get('email')?.value);
      formData.append('subject', form.get('subject')?.value);
      formData.append('message', form.get('message')?.value);
      formData.append('date', form.get('date')?.value);
      return of({ form, formData });
    }),
    switchMap(({ formData, form }) =>
      this.http
        .post(this.scriptURL, formData)
        .pipe(finalize(() => form.reset())),
    ),
    tap(() => this.submitLoading$.next(false)),
    catchError((error) => {
      return throwError(() => error);
    }),
  );
}
