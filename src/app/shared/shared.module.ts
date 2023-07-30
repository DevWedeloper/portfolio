import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ModalComponent } from '../components/modal/modal.component';
import { ScrollIndicatorComponent } from '../components/scroll-indicator/scroll-indicator.component';

import { TooltipDirective } from '../directives/tooltip.directive';
import { HighlightTextDirective } from '../directives/highlight-text.directive';
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
    BrowserAnimationsModule
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
