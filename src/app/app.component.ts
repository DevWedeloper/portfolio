import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent implements OnInit {
  title = 'portfolio';

  ngOnInit(): void {
    this.addScrollAnimation();
    this.addButtonEffect();
  }

  addScrollAnimation(): void {
    type Options = {
      threshold: number;
      rootMargin: string;
    };
    
    const appearOptions: Options = {
      threshold: 0,
      rootMargin: "0px 0px -150px 0px"
    };

    const appearOnScroll = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
          appearOnScroll.unobserve(entry.target);
        } else {
          return;
        }
      });
    }, appearOptions);

    const elements = document.querySelectorAll('.hidden');
    elements.forEach((element) => appearOnScroll.observe(element));
  }

  addButtonEffect(): void {
  const buttons =  Array.from(document.querySelectorAll('.btn-effect')) as HTMLElement[];

  buttons.forEach(button => {
    button.addEventListener("click", (event) => {
      event.preventDefault
      button.classList.add("animate");
      setTimeout(() => {
        button.classList.remove("animate");
      }, 600);
      });
    });
  }

}
