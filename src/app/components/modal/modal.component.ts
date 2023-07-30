import { Component } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  isVisible:boolean = false;

  openModal() {
    this.isVisible = true;
  }

  closeModal() {
    this.isVisible = false;
  }
}
