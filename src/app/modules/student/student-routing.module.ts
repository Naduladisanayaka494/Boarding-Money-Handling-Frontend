import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MyTransctionsComponent } from './my-transctions/my-transctions.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'my-transactions', component: MyTransctionsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
