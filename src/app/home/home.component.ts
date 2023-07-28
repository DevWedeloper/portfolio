import { Component, ElementRef, OnInit } from '@angular/core';
import { SectionService } from 'src/services/section.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

  constructor(
    private sectionService: SectionService,
    private el: ElementRef
  ){}

  ngOnInit(): void {
    const section = this.el.nativeElement.querySelector('section');
    this.sectionService.registerSection(section);
    this.addTypeEffect();
  }

  addTypeEffect(): void {
    const id = 'type-effect';
    const txtList: string[] = ['Software Engineer!', 'Full-stack Engineer!'];
    let index = 0;
    let currentTextIndex = 0;
    const typeSpeed = 55;
    let reverse = false;
    const reverseDelay = 1000;
  
    function typeWriter(): void {
      const element = document.getElementById(id);
      if (!element) return;
  
      const currentText = txtList[currentTextIndex];
  
      if (reverse) {
        element.innerHTML = currentText.substring(0, index);
        index--;
        if (index === -1) {
          reverse = false;
          index = 0;
          moveToNextText();
        }
      } else if (index < currentText.length) {
        element.innerHTML += currentText.charAt(index);
        index++;
        if (index === currentText.length) {
          setTimeout(() => {
            reverse = true;
            typeWriter();
          }, reverseDelay);
          return;
        }
      }
      setTimeout(typeWriter, typeSpeed);
    }
  
    function moveToNextText(): void {
      currentTextIndex++;
      if (currentTextIndex === txtList.length) {
        currentTextIndex = 0;
      }
    }
  
    typeWriter();
  }

}
