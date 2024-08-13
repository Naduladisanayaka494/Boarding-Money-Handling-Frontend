import { Component, OnInit } from '@angular/core';
import { StudentService } from 'src/services/student/student.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  recentTransactions: any[] = [];
  currentBalance: number = 0;

  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    this.fetchRecentTransactions();
  }

  fetchRecentTransactions(): void {
    this.studentService.getMoneyTransactions().subscribe(
      (data) => {
        // Sort transactions by date in descending order and get the 5 most recent
        const sortedTransactions = data.sort(
          (a: { transactionDateTime: string | number | Date; }, b: { transactionDateTime: string | number | Date; }) =>
            new Date(b.transactionDateTime).getTime() -
            new Date(a.transactionDateTime).getTime()
        );
        this.recentTransactions = sortedTransactions.slice(0, 5);

        // Calculate the current balance
        this.currentBalance = this.calculateCurrentBalance(data);
      },
      (error) => {
        console.error('Error fetching transactions', error);
      }
    );
  }

  calculateCurrentBalance(transactions: any[]): number {
    let balance = 0;
    transactions.forEach((transaction) => {
      if (transaction.transactionType === 'ADD_MONEY') {
        balance += transaction.amount;
      } else if (transaction.transactionType === 'SPEND_MONEY') {
        balance -= transaction.amount;
      }
    });
    return balance;
  }
}
