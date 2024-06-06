import { Directive } from '@angular/core';

@Directive({
  selector: '[appMainSection]',
  standalone: true,
  host: {
    class:
      'min-h-screen px-[9%] py-[10rem] text-text-color max-lg:px-[3%] max-lg:py-[10rem] max-md:px-[9%] max-md:py-[5rem]',
  },
})
export class MainSectionDirective {}
