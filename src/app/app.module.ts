import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { KatexModule } from 'ng-katex';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule, routedComponents } from './routing/app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {
  MatProgressBarModule,
  MatSliderModule,
  MatCardModule,
  MatMenuModule,
  MatIconModule,
  MatToolbarModule,
  MatButtonModule
} from '@angular/material';
import { HeaderComponent } from './header/header/header.component';
@NgModule({
  declarations: [
    AppComponent,
    routedComponents,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    KatexModule,
    BrowserAnimationsModule,
    NgbModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    MatSliderModule,
    MatCardModule,
    MatProgressBarModule,
    FormsModule,
    MatMenuModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
