import { Component } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  isVisible:boolean = false;
  isTransitioning: boolean = false; 

  openModal() {
    this.isVisible = true;
    if (this.isVisible) {
      this.isTransitioning = false;
      setTimeout(() => {
        this.isTransitioning = true;
      }, 10);
    }
  }

  closeModal() {
    this.isTransitioning = false;
    this.isVisible = false;
  }

  stopPropagation(event: Event) {
    event.stopPropagation();
  }
}
