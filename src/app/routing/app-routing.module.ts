import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IntegralComponent } from './../integral/integral.component';
import { RiemanComponent } from './../methods/rieman/rieman.component';
import { TrapecioComponent } from './../methods/trapecio/trapecio.component';
import { SimpsonComponent } from './../methods/simpson/simpson.component';
import { RombergComponent } from './../methods/romberg/romberg.component';
import { HistoryComponent } from '../history/history.component';

const appRoutes: Routes = [
  {
    path: 'numericsmethods',
    component: IntegralComponent
  },
  {
    path: 'rieman',
    component: RiemanComponent
  },
  {
    path: 'trapecio',
    component: TrapecioComponent
  },
  {
    path: 'simpson',
    component: SimpsonComponent
  },
  {
    path: 'romberg',
    component: RombergComponent
  },
  {
    path: 'history',
    component: HistoryComponent
  },
  {
    path:'**',
    redirectTo: 'numericsmethods',
    pathMatch: 'full'
  }
];

export const routedComponents = [
  IntegralComponent,
  RiemanComponent,
  TrapecioComponent,
  SimpsonComponent,
  RombergComponent,
  HistoryComponent
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes,{ useHash: true })],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
