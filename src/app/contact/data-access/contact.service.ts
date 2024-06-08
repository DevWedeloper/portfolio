import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  BehaviorSubject,
  Subject,
  catchError,
  map,
  of,
  switchMap,
  tap,
} from 'rxjs';
import { Message } from '../types/message.type';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private http = inject(HttpClient);
  private readonly scriptURL =
    'https://script.google.com/macros/s/AKfycbwGoIUZjbwmS16Ju1_I-HmTa3dbZ5cuOtuQjJRH44mAU4jM0u9D49oX3xEkSgjIhWzw/exec';
  submitForm$ = new Subject<Message>();
  submitLoading$ = new BehaviorSubject<boolean>(false);
  submitData = toSignal(
    this.submitForm$.pipe(
      tap(() => this.submitLoading$.next(true)),
      map((message) => {
        const formData = new FormData();
        formData.append('name', message!.name);
        formData.append('email', message!.email);
        formData.append('subject', message!.subject);
        formData.append('message', message!.message);
        formData.append('date', new Date().toISOString());
        return formData;
      }),
      switchMap((formData) => this.http.post(this.scriptURL, formData)),
      map(() => true),
      tap(() => this.submitLoading$.next(false)),
      catchError(() => of(false)),
    ),
  );
}
