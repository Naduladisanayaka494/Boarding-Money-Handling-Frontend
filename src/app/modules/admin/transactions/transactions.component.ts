import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/services/admin/admin.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss'],
})
export class TransactionsComponent implements OnInit {
  transactions: any[] = [];
  addMoneyTransactions: any[] = [];
  spendMoneyTransactions: any[] = [];
  totalAddMoney: number = 0;
  totalSpendMoney: number = 0;

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.fetchTransactions();
  }

  fetchTransactions(): void {
    this.adminService.getAllTransactions().subscribe(
      (data) => {
        this.transactions = data;
        this.calculateSums();
        this.separateTransactions();
      },
      (error) => {
        console.error('Error fetching transactions', error);
      }
    );
  }

  calculateSums(): void {
    this.totalAddMoney = this.transactions
      .filter((transaction) => transaction.transactionType === 'ADD_MONEY')
      .reduce((sum, transaction) => sum + transaction.amount, 0);

    this.totalSpendMoney = this.transactions
      .filter((transaction) => transaction.transactionType === 'SPEND_MONEY')
      .reduce((sum, transaction) => sum + transaction.amount, 0);
  }

  separateTransactions(): void {
    this.addMoneyTransactions = this.transactions.filter(
      (transaction) => transaction.transactionType === 'ADD_MONEY'
    );
    this.spendMoneyTransactions = this.transactions.filter(
      (transaction) => transaction.transactionType === 'SPEND_MONEY'
    );
  }
}
