import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ScrollIndicatorComponent } from '../components/scroll-indicator/scroll-indicator.component';
import { ModalComponent } from '../components/modal/modal.component';
import { TabsComponent } from '../components/tabs/tabs.component';

import { TooltipDirective } from '../directives/tooltip.directive';
import { HighlightTextDirective } from '../directives/highlight-text.directive';
@NgModule({
  declarations: [
    ScrollIndicatorComponent,
    TabsComponent,
    ModalComponent,
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
    ScrollIndicatorComponent,
    TabsComponent,
    ModalComponent,
    TooltipDirective,
    HighlightTextDirective
  ],
})
export class SharedModule { }
