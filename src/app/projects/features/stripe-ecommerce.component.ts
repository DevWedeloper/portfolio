import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ThemeService } from '../../shared/data-access/theme.service';
import { CardComponent } from '../ui/card/card.component';
import { CardDirective } from '../ui/card/card.directive';
import { SlideDirective } from '../ui/slider/slide.directive';
import { SliderComponent } from '../ui/slider/slider.component';

@Component({
  selector: 'app-stripe-ecommerce',
  standalone: true,
  imports: [CardComponent, CardDirective, SliderComponent, SlideDirective],
  template: `
    <app-card
      [src]="
        isDarkMode()
          ? 'assets/images/backgrounds/stripe-ecommerce-dark.webp'
          : 'assets/images/backgrounds/stripe-ecommerce-light.webp'
      "
      title="Stripe Ecommerce"
      [tags]="[
        'Angular',
        'Analog.js',
        'Spartan UI',
        'Tailwind CSS',
        'Supabase',
        'tRPC',
        'Nitro',
        'h3',
        'PostgreSQL',
        'Drizzle ORM',
        'Stripe',
        'Vite',
        'Vercel',
      ]"
      githubLink="https://github.com/DevWedeloper/stripe-ecommerce"
      websiteLink="https://stripe-ecommerce-devwedeloper.vercel.app/"
    >
      <app-slider *appCard>
        <p class="exclude" *appSlide>
          <strong>Stripe eCommerce</strong>
          is a full-stack app inspired by platforms like Amazon, Lazada, and
          Shopee — enabling users to buy and sell products with secure payment
          processing.
        </p>
        <p class="exclude" *appSlide>
          <strong>Authentication</strong>
          is handled via Supabase Auth, allowing secure login and registration
          flows.
        </p>
        <p class="exclude" *appSlide>
          <strong>Shopping Features</strong>
          include product browsing, variation selection, cart management, and a
          full checkout process.
        </p>
        <p class="exclude" *appSlide>
          <strong>Stripe Integration</strong>
          ensures all payments are securely processed with Stripe Elements — the
          app never touches sensitive payment data.
        </p>
        <p class="exclude" *appSlide>
          <strong>Order Flow:</strong>
          From product selection ➡️ cart ➡️ checkout ➡️ Stripe payment ➡️
          confirmation. Smooth and retail-ready.
        </p>
        <div *appSlide>
          <p class="exclude">To get started, use this account:</p>
          <div class="text-center">
            <p class="exclude">email: user&#64;example.com</p>
            <p class="exclude">password: password123</p>
          </div>
        </div>
      </app-slider>
    </app-card>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StripeEcommerceComponent {
  protected isDarkMode = inject(ThemeService).isDarkMode;
}
