import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/services/admin/admin.service';
import { jsPDF } from 'jspdf';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss'],
})
export class TransactionsComponent implements OnInit {
  transactions: any[] = [];
  addMoneyTransactions: any[] = [];
  spendMoneyTransactions: any[] = [];
  filteredAddMoneyTransactions: any[] = [];
  filteredSpendMoneyTransactions: any[] = [];
  totalAddMoney: number = 0;
  totalSpendMoney: number = 0;

  filterUser: string = '';
  filterDate: string = '';

  students: any[] = []; // Array to store students

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.fetchStudents(); // Fetch students on component initialization
    this.fetchTransactions();
  }

  fetchStudents(): void {
    this.adminService.getAllStudents().subscribe(
      (data) => {
        this.students = data;
      },
      (error) => {
        console.error('Error fetching students', error);
      }
    );
  }

  fetchTransactions(): void {
    this.adminService.getAllTransactions().subscribe(
      (data) => {
        this.transactions = data;
        this.calculateSums();
        this.separateTransactions();
        this.applyFilters();
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

  applyFilters(): void {
    this.filteredAddMoneyTransactions = this.addMoneyTransactions.filter(
      (transaction) =>
        (!this.filterUser || transaction.user.name.includes(this.filterUser)) &&
        (!this.filterDate ||
          transaction.transactionDateTime.startsWith(this.filterDate))
    );

    this.filteredSpendMoneyTransactions = this.spendMoneyTransactions.filter(
      (transaction) =>
        (!this.filterUser || transaction.user.name.includes(this.filterUser)) &&
        (!this.filterDate ||
          transaction.transactionDateTime.startsWith(this.filterDate))
    );

    // If no filters are applied, show all transactions
    if (!this.filterUser && !this.filterDate) {
      this.filteredAddMoneyTransactions = this.addMoneyTransactions;
      this.filteredSpendMoneyTransactions = this.spendMoneyTransactions;
    }
  }

  downloadAsPDF(): void {
    const doc = new jsPDF();
    let startY = 30;

    // Add Title
    doc.text('Transactions Report', 14, 20);

    // Define table headers
    const headers = ['ID', 'User', 'Amount', 'Description', 'Date'];

    // Add headers to the PDF
    headers.forEach((header, index) => {
      doc.text(header, 14 + index * 40, startY);
    });

    // Add data rows for Add Money Transactions
    startY += 10;
    this.filteredAddMoneyTransactions.forEach((transaction) => {
      doc.text(transaction.id.toString(), 14, startY);
      doc.text(transaction.user.name, 54, startY);
      doc.text(transaction.amount.toString(), 94, startY);
      doc.text(transaction.description, 134, startY);
      doc.text(
        new Date(transaction.transactionDateTime).toLocaleDateString(),
        174,
        startY
      );
      startY += 10;
    });

    // Add data rows for Spend Money Transactions
    startY += 10; // Add some space between sections
    this.filteredSpendMoneyTransactions.forEach((transaction) => {
      doc.text(transaction.id.toString(), 14, startY);
      doc.text(transaction.user.name, 54, startY);
      doc.text(transaction.amount.toString(), 94, startY);
      doc.text(transaction.description, 134, startY);
      doc.text(
        new Date(transaction.transactionDateTime).toLocaleDateString(),
        174,
        startY
      );
      startY += 10;
    });

    // Save the PDF
    doc.save('transactions.pdf');
  }
}
