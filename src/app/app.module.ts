import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { KatexModule } from 'ng-katex';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule, routedComponents } from './routing/app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import {
  MatProgressBarModule
} from '@angular/material';
@NgModule({
  declarations: [
    AppComponent,
    routedComponents
  ],
  imports: [
    BrowserModule,
    KatexModule,
    BrowserAnimationsModule,
    NgbModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    MatProgressBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
