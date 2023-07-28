import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ModalComponent } from 'src/components/modal/modal.component';
import { TooltipDirective } from 'src/directives/tooltip.directive';
import { ScrollIndicatorComponent } from './scroll-indicator/scroll-indicator.component';

@NgModule({
  declarations: [
    AppComponent,
    ModalComponent,
    TooltipDirective,
    ScrollIndicatorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    ScrollingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
