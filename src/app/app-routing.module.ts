import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuSidenavComponent } from '../app/menu-sidenav/menu-sidenav.component';
import { EditInitiativeComponent } from '../app/edit-initiative/edit-initiative.component';

const routes: Routes = [
  { path: 'home', component: MenuSidenavComponent },
  { path: 'edit-initiative', component: EditInitiativeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
