import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-scroll-indicator',
  templateUrl: './scroll-indicator.component.html',
  styleUrls: ['./scroll-indicator.component.scss']
})
export class ScrollIndicatorComponent implements OnInit {
  shapes: number[] = [];
  sections!: NodeListOf<HTMLElement>;

  @ViewChildren('shapeElement') shapeElements!: QueryList<ElementRef<HTMLLIElement>>;

  ngOnInit(): void {
    this.sections = document.querySelectorAll('section');
    this.shapes = Array.from({ length: this.sections.length }, (_, index) => index + 1);
    this.updateShapesAndProgressBar();
  }
  
  updateShapesAndProgressBar(): void {

    window.addEventListener('scroll', () => {
      this.sections.forEach(((sec, index) => {
        const top = window.scrollY;
        const offset = sec.offsetTop - 150;
        const height = sec.offsetHeight;

        const scroll = window.pageYOffset || document.documentElement.scrollTop;
        const doc = Math.max(
          document.body.scrollHeight,
          document.documentElement.scrollHeight
        );
        const win = window.innerHeight || document.documentElement.clientHeight;
        const value = (scroll / (doc - win)) * 100;
        const line = document.querySelector('.line') as HTMLElement;
        line.style.height = value + '%';
    
        if (top >= offset && top < offset + height) {
          this.shapeElements.forEach((shape, shapeIndex) => {
            if (shapeIndex === index) {
              shape.nativeElement.classList.add('active');
            } else {
              shape.nativeElement.classList.remove('active');
            }
          });
        }

      }));
    });

  }
  
}
