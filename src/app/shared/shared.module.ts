import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { ModalComponent } from 'src/components/modal/modal.component';
import { ScrollIndicatorComponent } from 'src/components/scroll-indicator/scroll-indicator.component';

import { TooltipDirective } from 'src/directives/tooltip.directive';
import { HighlightTextDirective } from 'src/directives/highlight-text.directive';

@NgModule({
  declarations: [
    ModalComponent,
    ScrollIndicatorComponent,
    TooltipDirective,
    HighlightTextDirective
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
    ScrollIndicatorComponent,
    TooltipDirective,
    HighlightTextDirective
  ],
})
export class SharedModule { }
