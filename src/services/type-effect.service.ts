import { Injectable, Renderer2 } from '@angular/core';

interface TypingEffect {
  phrases: string[];
  typeSpeed: number;
  reverseSpeed: number;
  reverseDelay: number;
  loop: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class TypingEffectService {
  constructor(private renderer: Renderer2) {}

  addTypeEffect(typingEffectOptions: TypingEffect, element: HTMLElement): void {
    let letterIndex = 0;
    let phraseIndex = 0;
    let reverse = false;

    const updateText = (text: string) => this.renderer.setProperty(element, 'textContent', text);

    const typeWriter = () => {
      const currentText = typingEffectOptions.phrases[phraseIndex];

      if (reverse) {
        updateText(currentText.substring(0, letterIndex));
        letterIndex--;
        if (letterIndex === -1) {
          reverse = false;
          letterIndex = 0;
          moveToNextText();
        }
      } else if (letterIndex < currentText.length) {
        updateText(currentText.substring(0, letterIndex + 1));
        letterIndex++;
        if (letterIndex === currentText.length) {
          if (phraseIndex === typingEffectOptions.phrases.length - 1 && !typingEffectOptions.loop) {
            return;
          }
          setTimeout(() => {
            reverse = true;
            typeWriter();
          }, typingEffectOptions.reverseDelay);
          return;
        }
      }
      setTimeout(typeWriter, reverse ? typingEffectOptions.reverseSpeed : typingEffectOptions.typeSpeed);
    };

    function moveToNextText(): void {
      phraseIndex++;
      if (phraseIndex === typingEffectOptions.phrases.length) {
        if (typingEffectOptions.loop) {
          phraseIndex = 0;
        } else {
          return;
        }
      }
    }

    typeWriter();
  }
}
