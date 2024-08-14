import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddMoneyComponent } from './add-money/add-money.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { FormsModule } from '@angular/forms';
import { SepndMoneyComponent } from './sepnd-money/sepnd-money.component';
import { CurrentMoneyComponent } from './current-money/current-money.component';



@NgModule({
  declarations: [DashboardComponent, AddMoneyComponent, TransactionsComponent, SepndMoneyComponent, CurrentMoneyComponent],
  imports: [CommonModule, AdminRoutingModule, FormsModule],
})
export class AdminModule {}
