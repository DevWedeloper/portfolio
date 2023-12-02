import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  OnInit,
  inject
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SectionService } from '../shared/data-access/section.service';
import { TypeEffectService } from '../shared/data-access/type-effect.service';
import { HighlightTextDirective } from '../shared/ui/directives/highlight-text.directive';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HighlightTextDirective],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  ss = inject(SectionService);
  tes = inject(TypeEffectService);
  elementRef = inject(ElementRef);
  @HostBinding('attr.id') id = 'home';
  @HostBinding('class.section') wrapperClass = true;
  typeEffect = new BehaviorSubject<string>('');

  ngOnInit(): void {
    this.ss.registerSection(this.elementRef);
    this.tes.addTypeEffect(
      {
        phrases: ['Software Engineer!', 'Full-stack Engineer!'],
        typeSpeed: 55,
        reverseSpeed: 40,
        reverseDelay: 1000,
        loop: true,
      },
      this.typeEffect
    );
  }
}
