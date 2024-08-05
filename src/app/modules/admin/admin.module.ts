import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddMoneyComponent } from './add-money/add-money.component';
import { TransactionsComponent } from './transactions/transactions.component';


@NgModule({
  declarations: [
    DashboardComponent,
    AddMoneyComponent,
    TransactionsComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
