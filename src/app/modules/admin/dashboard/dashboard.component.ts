import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { AdminService } from 'src/services/admin/admin.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  totalAddMoney: number = 0;
  totalSpendMoney: number = 0;

  constructor(private adminService: AdminService) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.fetchTransactionData();
  }

  fetchTransactionData(): void {
    this.adminService.getAllTransactions().subscribe(
      (data) => {
        this.calculateSums(data);
        this.renderCharts();
      },
      (error) => {
        console.error('Error fetching transactions', error);
      }
    );
  }

  calculateSums(transactions: any[]): void {
    this.totalAddMoney = transactions
      .filter((transaction) => transaction.transactionType === 'ADD_MONEY')
      .reduce((sum, transaction) => sum + transaction.amount, 0);

    this.totalSpendMoney = transactions
      .filter((transaction) => transaction.transactionType === 'SPEND_MONEY')
      .reduce((sum, transaction) => sum + transaction.amount, 0);
  }

  renderCharts(): void {
    // Add Money Chart
    new Chart('addMoneyChart', {
      type: 'doughnut',
      data: {
        labels: ['Add Money'],
        datasets: [
          {
            data: [this.totalAddMoney],
            backgroundColor: ['#28a745'],
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    });

    // Spend Money Chart
    new Chart('spendMoneyChart', {
      type: 'doughnut',
      data: {
        labels: ['Spend Money'],
        datasets: [
          {
            data: [this.totalSpendMoney],
            backgroundColor: ['#dc3545'],
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    });
  }
}
