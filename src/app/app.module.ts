import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { KatexModule } from 'ng-katex';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule, routedComponents } from './routing/app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule} from '@angular/forms';

import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule } from '@angular/fire';
import { HeaderComponent } from './header/header/header.component';
import { environment } from 'src/environments/environment';

import {
  MatProgressBarModule,
  MatSliderModule,
  MatCardModule,
  MatMenuModule,
  MatIconModule,
  MatToolbarModule,
  MatButtonModule,
  MatSidenavModule,
  MatTabsModule,
  MatTableModule,
  MatInputModule,
  MatFormFieldModule,
} from '@angular/material';


import { ChartsModule } from 'ng2-charts';
import { MethodsComponent } from './pages/methods/methods/methods.component';
import { GraphicsComponent } from './pages/graphics/graphics/graphics.component';

@NgModule({
  declarations: [
    AppComponent,
    routedComponents,
    HeaderComponent,
    MethodsComponent,
    GraphicsComponent
  ],
  imports: [
    BrowserModule,
    KatexModule,
    BrowserAnimationsModule,
    NgbModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatSliderModule,
    MatCardModule,
    MatProgressBarModule,
    MatMenuModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatTabsModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    ChartsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
