import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StudentRoutingModule } from './student-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MyTransctionsComponent } from './my-transctions/my-transctions.component';


@NgModule({
  declarations: [DashboardComponent, MyTransctionsComponent],
  imports: [CommonModule, StudentRoutingModule, FormsModule],
})
export class StudentModule {}
