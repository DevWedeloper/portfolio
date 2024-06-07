import { Directive, computed, input } from '@angular/core';
import { twMerge } from 'tailwind-merge';

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
      'opacity-0 blur-sm transition duration-500 ease-in-out motion-reduce:transition-none',
      directionClasses,
      this.userClass(),
    );
  });

  private getDirectionClasses(
    direction: 'top' | 'bottom' | 'left' | 'right',
  ): string {
    switch (direction) {
      case 'top':
        return '-translate-y-1/2 transform';
      case 'bottom':
        return 'translate-y-1/2 transform';
      case 'left':
        return '-translate-x-1/2 transform';
      case 'right':
        return 'translate-x-1/2 transform';
      default:
        return '';
    }
  }
}
