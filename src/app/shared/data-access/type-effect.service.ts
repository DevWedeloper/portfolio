import { ElementRef, Injectable } from '@angular/core';

interface TypingEffect {
  phrases: string[];
  typeSpeed: number;
  reverseSpeed: number;
  reverseDelay: number;
  loop: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class TypeEffectService {
  addTypeEffect(
    { phrases, typeSpeed, reverseSpeed, reverseDelay, loop }: TypingEffect,
    element: ElementRef<HTMLElement>,
  ): void {
    const updateText = (text: string) =>
      (element.nativeElement.textContent = text);
    const delay = (ms: number) =>
      new Promise((resolve) => setTimeout(resolve, ms));

    const typeWriter = async () => {
      for (let phrase of phrases) {
        for (let [index, _] of phrase.split('').entries()) {
          updateText(phrase.substring(0, index + 1));
          await delay(typeSpeed);
        }
        await delay(reverseDelay);
        for (let [index, _] of phrase.split('').entries()) {
          updateText(phrase.substring(0, phrase.length - index));
          await delay(reverseSpeed);
        }
      }
      if (loop) typeWriter();
    };

    typeWriter();
  }
}
