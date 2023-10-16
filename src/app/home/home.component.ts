import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SectionService } from '../services/section.service';
import { TypeEffectService } from '../services/type-effect.service';
import { HighlightTextDirective } from '../directives/highlight-text.directive';

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
    styleUrls: ['./home.component.scss'],
    standalone: true,
    imports: [HighlightTextDirective]
})
export class HomeComponent implements OnInit {
  @ViewChild('section', { static: true }) section!: ElementRef<HTMLElement>;
  @ViewChild('typeEffect', { static: true }) typeEffect!: ElementRef<HTMLElement>;

  constructor(
    private sectionService: SectionService,
    private typeEffectService: TypeEffectService
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
    this.typeEffectService.addTypeEffect(typingEffectOptions, this.typeEffect.nativeElement);
  }

}
