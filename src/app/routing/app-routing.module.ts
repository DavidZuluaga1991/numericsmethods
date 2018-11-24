import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IntegralComponent } from './../pages/integral/integral.component';
import { RiemanComponent } from './../pages/methods/rieman/rieman.component';
import { TrapecioComponent } from './../pages/methods/trapecio/trapecio.component';
import { SimpsonComponent } from './../pages/methods/simpson/simpson.component';
import { RombergComponent } from './../pages/methods/romberg/romberg.component';
import { HistoryComponent } from '../pages/history/history.component';
import { ModalComponent } from '../pages/methods/modal/modal.component';

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
    path: 'modal',
    component: ModalComponent
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
  HistoryComponent,
  ModalComponent
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes,{ useHash: true })],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
