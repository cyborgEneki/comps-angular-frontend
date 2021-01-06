import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditInitiativeComponent } from '../app/edit-initiative/edit-initiative.component';
import { IndicatorComponent } from './indicator/indicator.component';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
  { path: '', component: WelcomeComponent },
  {
    path: 'edit-initiative/:initiativeId',
    component: EditInitiativeComponent,
  },
  {
    path: 'initiative/create-indicator/:initiativeId',
    component: IndicatorComponent,
  },
  {
    path: 'initiative/edit-pathway/:pathwayId/:indicatorType',
    component: IndicatorComponent,
  },
  {
    path: 'initiative/edit-outcome/:outcomeId/:indicatorType',
    component: IndicatorComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }