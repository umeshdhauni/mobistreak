import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AssignmentOneComponent } from './components/assignment-one/assignment-one.component';
import { AssignmentTwoComponent } from './components/assignment-two/assignment-two.component';

const routes: Routes = [
  {
    path:'',
    component:AssignmentOneComponent
  },
  {
    path:'assignment-two',
    component:AssignmentTwoComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
