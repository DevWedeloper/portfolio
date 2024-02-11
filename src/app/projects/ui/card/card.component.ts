import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  TemplateRef,
  inject,
  input,
} from '@angular/core';
import { ThemeService } from '../../../shared/data-access/theme.service';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
  src = input.required<string>();
  title = input.required<string>();
  tags = input.required<string[]>();
  websiteLink = input.required<string>();
  githubLink = input.required<string>();
  @ContentChild('cardBodyTemplate') cardBody:
    | TemplateRef<HTMLElement>
    | undefined;

  protected ts = inject(ThemeService);
}
