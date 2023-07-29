import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { SectionService } from 'src/services/section.service';

interface TypingEffect {
  phrases: string[];
  typeSpeed: number;
  reverseSpeed: number;
  reverseDelay: number;
  loop: boolean;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild('section', { static: true }) section!: ElementRef<HTMLElement>;
  @ViewChild('typeEffect', { static: true }) typeEffect!: ElementRef<HTMLElement>;

  constructor(
    private sectionService: SectionService,
    private renderer: Renderer2,
  ){}

  ngOnInit(): void {
    this.sectionService.registerSection(this.section);
    const typingEffectOptions: TypingEffect = {
      phrases: ['Software Engineer!', 'Full-stack Engineer!'],
      typeSpeed: 55,
      reverseSpeed: 40,
      reverseDelay: 1000,
      loop: true,
    };
    this.addTypeEffect(typingEffectOptions);
  }

  private addTypeEffect(typingEffectOptions: TypingEffect): void {
    let letterIndex = 0;
    let phraseIndex = 0;
    let reverse = false;

    const element = this.typeEffect.nativeElement;
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
