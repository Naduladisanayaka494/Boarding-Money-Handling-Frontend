import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { AddMoneyComponent } from './add-money/add-money.component';
import { SepndMoneyComponent } from './sepnd-money/sepnd-money.component';
import { CurrentMoneyComponent } from './current-money/current-money.component';
import { EditTransactionComponent } from './edit-transaction/edit-transaction.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'transactions', component: TransactionsComponent },
  { path: 'add-money', component: AddMoneyComponent },
  { path: 'spend-money', component: SepndMoneyComponent },
  { path: 'current-money', component: CurrentMoneyComponent },
  { path: 'edit-transaction/:id', component: EditTransactionComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
