import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { SectionService } from '../shared/data-access/section.service';
import { TypeEffectService } from '../shared/data-access/type-effect.service';
import { HighlightTextDirective } from '../shared/ui/directives/highlight-text.directive';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HighlightTextDirective],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  ss = inject(SectionService);
  tes = inject(TypeEffectService);
  @ViewChild('section', { static: true }) section!: ElementRef<HTMLElement>;
  @ViewChild('typeEffect', { static: true })
  typeEffect!: ElementRef<HTMLElement>;

  ngOnInit(): void {
    this.ss.registerSection(this.section);
    this.tes.addTypeEffect(
      {
        phrases: ['Software Engineer!', 'Full-stack Engineer!'],
        typeSpeed: 55,
        reverseSpeed: 40,
        reverseDelay: 1000,
        loop: true,
      },
      this.typeEffect.nativeElement
    );
  }
}
