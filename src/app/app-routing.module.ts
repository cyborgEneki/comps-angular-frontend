import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditInitiativeComponent } from '../app/edit-initiative/edit-initiative.component';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'edit-initiative', component: EditInitiativeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }