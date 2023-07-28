import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ModalComponent } from 'src/components/modal/modal.component';
import { TooltipDirective } from 'src/directives/tooltip.directive';
import { ScrollIndicatorComponent } from 'src/components/scroll-indicator/scroll-indicator.component';

@NgModule({
  declarations: [
    ModalComponent,
    TooltipDirective,
    ScrollIndicatorComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    ScrollingModule,
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    ScrollingModule,
    ModalComponent,
    TooltipDirective,
    ScrollIndicatorComponent
  ],
})
export class SharedModule { }
