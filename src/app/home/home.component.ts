import { ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SectionService } from '../shared/data-access/section.service';
import { TypeEffectService } from '../shared/data-access/type-effect.service';
import { HighlightTextDirective } from '../shared/ui/directives/highlight-text.directive';

interface TypingEffect {
  phrases: string[];
  typeSpeed: number;
  reverseSpeed: number;
  reverseDelay: number;
  loop: boolean;
}

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [HighlightTextDirective],
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
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
