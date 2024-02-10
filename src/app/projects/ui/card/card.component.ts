import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  Input,
  TemplateRef,
  inject,
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
  @Input({ required: true }) src!: string;
  @Input({ required: true }) title!: string;
  @Input({ required: true }) tags!: string[];
  @Input({ required: true }) websiteLink!: string;
  @Input({ required: true }) githubLink!: string;
  @ContentChild('cardBodyTemplate') cardBody:
    | TemplateRef<HTMLElement>
    | undefined;

  ts = inject(ThemeService);
}
