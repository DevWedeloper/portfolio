import { Directive, computed, input } from '@angular/core';
import { twMerge } from 'tailwind-merge';

const initialClass = 'opacity-0 blur-sm';
const initialTopClass = '-translate-y-1/2';
const initialBottomClass = 'translate-y-1/2';
const initialLeftClass = '-translate-x-1/2';
const initialRightClass = 'translate-x-1/2';

export const initialClassToRemove = `${initialClass} ${initialTopClass} ${initialBottomClass} ${initialLeftClass} ${initialRightClass}`;

@Directive({
  selector: '[appInitialAnimation]',
  standalone: true,
  host: {
    '[class]': 'computedClass()',
  },
})
export class InitialAnimationDirective {
  userClass = input<string>('', { alias: 'class' });
  direction = input<'top' | 'bottom' | 'left' | 'right'>('top');

  protected computedClass = computed(() => {
    const directionClasses = this.getDirectionClasses(this.direction());
    return twMerge(
      `${initialClass} transition-[transform,filter,opacity] duration-500 ease-in-out motion-reduce:transition-none`,
      directionClasses,
      this.userClass(),
    );
  });

  private getDirectionClasses(
    direction: 'top' | 'bottom' | 'left' | 'right',
  ): string {
    switch (direction) {
      case 'top':
        return `${initialTopClass}`;
      case 'bottom':
        return `${initialBottomClass}`;
      case 'left':
        return `${initialLeftClass}`;
      case 'right':
        return `${initialRightClass}`;
      default:
        return '';
    }
  }
}
