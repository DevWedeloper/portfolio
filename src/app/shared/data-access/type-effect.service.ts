import {
  ElementRef,
  Injectable,
  Renderer2,
  RendererFactory2,
  inject,
} from '@angular/core';

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
  private renderer: Renderer2;
  rendererFactory = inject(RendererFactory2);
  constructor() {
    this.renderer = this.rendererFactory.createRenderer(null, null);
  }

  addTypeEffect(
    { phrases, typeSpeed, reverseSpeed, reverseDelay, loop }: TypingEffect,
    element: ElementRef<HTMLElement>,
  ): void {
    let letterIndex = 0;
    let phraseIndex = 0;
    let reverse = false;

    const updateText = (text: string) =>
      (element.nativeElement.textContent = text);

    const typeWriter = () => {
      const currentText = phrases[phraseIndex];

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
          if (phraseIndex === phrases.length - 1 && !loop) {
            return;
          }
          setTimeout(() => {
            reverse = true;
            typeWriter();
          }, reverseDelay);
          return;
        }
      }
      setTimeout(typeWriter, reverse ? reverseSpeed : typeSpeed);
    };

    function moveToNextText(): void {
      phraseIndex++;
      if (phraseIndex === phrases.length) {
        if (loop) {
          phraseIndex = 0;
        } else {
          return;
        }
      }
    }

    typeWriter();
  }
}
