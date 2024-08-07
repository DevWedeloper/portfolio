import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  booleanAttribute,
  effect,
  inject,
  input,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { concat, delay, filter, fromEvent, of, switchMap } from 'rxjs';

@Component({
  selector: `button[custom-button], a[custom-button]`,
  standalone: true,
  host: {
    class:
      'relative rounded-2xl bg-main-color text-regular text-text-color transition-transform duration-150 ease-in-out active:scale-95',
  },
  template: `
    <ng-content />
  `,
  styles: [
    `
      :host {
        -webkit-tap-highlight-color: transparent;
      }

      :host::before,
      :host::after {
        position: absolute;
        content: '';
        width: 150%;
        left: 50%;
        height: 100%;
        transform: translateX(-50%);
        z-index: -1;
        background-repeat: no-repeat;
        pointer-events: none;
      }

      :host.animate::before {
        top: -70%;
        background-image: radial-gradient(
            circle,
            var(--main-color) 20%,
            transparent 20%
          ),
          radial-gradient(
            circle,
            transparent 20%,
            var(--main-color) 20%,
            transparent 30%
          ),
          radial-gradient(circle, var(--main-color) 20%, transparent 20%),
          radial-gradient(circle, var(--main-color) 20%, transparent 20%),
          radial-gradient(
            circle,
            transparent 10%,
            var(--main-color) 15%,
            transparent 20%
          ),
          radial-gradient(circle, var(--main-color) 20%, transparent 20%),
          radial-gradient(circle, var(--main-color) 20%, transparent 20%),
          radial-gradient(circle, var(--main-color) 20%, transparent 20%),
          radial-gradient(circle, var(--main-color) 20%, transparent 20%);
        background-size:
          10% 10%,
          20% 20%,
          15% 15%,
          20% 20%,
          18% 18%,
          10% 10%,
          15% 15%,
          10% 10%,
          18% 18%;
        animation: topBubbles ease-in-out 0.6s forwards infinite;
      }

      :host.animate::after {
        bottom: -70%;
        background-image: radial-gradient(
            circle,
            var(--main-color) 20%,
            transparent 20%
          ),
          radial-gradient(circle, var(--main-color) 20%, transparent 20%),
          radial-gradient(
            circle,
            transparent 10%,
            var(--main-color) 15%,
            transparent 20%
          ),
          radial-gradient(circle, var(--main-color) 20%, transparent 20%),
          radial-gradient(circle, var(--main-color) 20%, transparent 20%),
          radial-gradient(circle, var(--main-color) 20%, transparent 20%),
          radial-gradient(circle, var(--main-color) 20%, transparent 20%);
        background-size:
          15% 15%,
          20% 20%,
          18% 18%,
          20% 20%,
          15% 15%,
          20% 20%,
          18% 18%;
        animation: bottomBubbles ease-in-out 0.6s forwards infinite;
      }

      @keyframes topBubbles {
        0% {
          background-position:
            5% 90%,
            10% 90%,
            10% 90%,
            15% 90%,
            25% 90%,
            25% 90%,
            40% 90%,
            55% 90%,
            70% 90%;
        }
        50% {
          background-position:
            0% 80%,
            0% 20%,
            10% 40%,
            20% 0%,
            30% 30%,
            22% 50%,
            50% 50%,
            65% 20%,
            90% 30%;
        }
        100% {
          background-position:
            0% 70%,
            0% 10%,
            10% 30%,
            20% -10%,
            30% 20%,
            22% 40%,
            50% 40%,
            65% 10%,
            90% 20%;
          background-size:
            0% 0%,
            0% 0%,
            0% 0%,
            0% 0%,
            0% 0%,
            0% 0%;
        }
      }

      @keyframes bottomBubbles {
        0% {
          background-position:
            10% -10%,
            30% 10%,
            55% -10%,
            70% -10%,
            85% -10%,
            70% -10%,
            70% 0%;
        }
        50% {
          background-position:
            0% 80%,
            20% 80%,
            45% 60%,
            60% 100%,
            75% 70%,
            95% 60%,
            105% 0%;
        }
        100% {
          background-position:
            0% 90%,
            20% 90%,
            45% 70%,
            60% 110%,
            75% 80%,
            95% 70%,
            110% 10%;
          background-size:
            0% 0%,
            0% 0%,
            0% 0%,
            0% 0%,
            0% 0%,
            0% 0%;
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomButtonComponent {
  private elementRef = inject(ElementRef);
  disableEffect = input(false, {
    transform: booleanAttribute,
  });

  private animate = toSignal(
    fromEvent(this.elementRef.nativeElement, 'click').pipe(
      filter(() => !this.disableEffect()),
      switchMap(() => concat(of('animate'), of('').pipe(delay(600)))),
    ),
  );

  constructor() {
    effect(() => {
      if (this.animate() === 'animate')
        this.elementRef.nativeElement.classList.add('animate');
      else if (this.animate() === '')
        this.elementRef.nativeElement.classList.remove('animate');
    });
  }
}
