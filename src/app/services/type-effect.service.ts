import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

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
export class TypeEffectService {
  private renderer: Renderer2;
  constructor(private rendererFactory: RendererFactory2) {
    this.renderer = this.rendererFactory.createRenderer(null, null);
  }

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
