import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  EMPTY,
  Subject,
  catchError,
  map,
  merge,
  shareReplay,
  startWith,
  switchMap,
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
  private error$ = new Subject<Error>();

  private submitData$ = this.submitForm$.pipe(
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
    catchError((error) => {
      this.error$.next(error);
      return EMPTY;
    }),
    shareReplay(1),
  );

  private status$ = merge(
    this.submitData$.pipe(map(() => 'success' as const)),
    this.submitForm$.pipe(map(() => 'loading' as const)),
    this.error$.pipe(map(() => 'error' as const)),
  ).pipe(startWith('initial' as const));

  status = toSignal(this.status$, { initialValue: 'initial' });
}
