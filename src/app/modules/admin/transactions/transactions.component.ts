import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/services/admin/admin.service';
import { jsPDF } from 'jspdf';
import { Router } from '@angular/router';

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

  constructor(private adminService: AdminService, private router: Router) {}

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

    this.totalAddMoney = this.filteredAddMoneyTransactions.reduce(
      (sum, transaction) => sum + transaction.amount,
      0
    );

    this.totalSpendMoney = this.filteredSpendMoneyTransactions.reduce(
      (sum, transaction) => sum + transaction.amount,
      0
    );
  }
  downloadAsPDF(): void {
    const doc = new jsPDF('landscape');
    let startY = 20;
    const lineHeight = 10;

    const addPageIfNeeded = () => {
      if (startY + lineHeight > doc.internal.pageSize.getHeight() - 20) {
        doc.addPage();
        startY = 20; // Reset startY to the top of the new page
      }
    };

    // Add Title
    doc.setFontSize(18);
    doc.setTextColor(40, 40, 40);
    doc.text('Transactions Report', 140, startY, { align: 'center' });

    startY += lineHeight + 5;
    addPageIfNeeded();

    // Define table headers including Current Credit
    const headers = [
      'ID',
      'User',
      'Amount',
      'Description',
      'Date',
      'Current Credit',
    ];
    const columnXPositions = [14, 54, 94, 134, 174, 214]; // X positions for each column

    let currentCredit = 0;

    // Add section title for Add Money transactions
    doc.setFontSize(14);
    doc.setTextColor(0, 102, 204);
    doc.text('Add Money Transactions', 14, startY);

    startY += lineHeight;
    addPageIfNeeded();

    // Add headers for Add Money transactions
    doc.setFontSize(12);
    doc.setTextColor(0);
    headers.forEach((header, index) => {
      doc.text(header, columnXPositions[index], startY);
    });

    startY += lineHeight;
    addPageIfNeeded();

    // Add data rows for Add Money Transactions
    this.filteredAddMoneyTransactions.forEach((transaction) => {
      currentCredit += transaction.amount; // Add to current credit
      doc.text(transaction.id.toString(), columnXPositions[0], startY);
      doc.text(transaction.user.name, columnXPositions[1], startY);
      doc.text(transaction.amount.toFixed(2), columnXPositions[2], startY);
      doc.text(transaction.description, columnXPositions[3], startY);
      doc.text(
        new Date(transaction.transactionDateTime).toLocaleDateString(),
        columnXPositions[4],
        startY
      );
      doc.text(currentCredit.toFixed(2), columnXPositions[5], startY); // Show current credit

      startY += lineHeight;
      addPageIfNeeded();
    });

    // Display the total Add Money amount and transaction count for filtered transactions
    startY += 5;
    addPageIfNeeded();
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Total Add Money:', 54, startY);
    doc.text(this.totalAddMoney.toFixed(2), 94, startY);
    doc.text(
      `Total Transactions: ${this.filteredAddMoneyTransactions.length}`,
      134,
      startY
    );

    // Add some space before Spend Money Transactions
    startY += 20;
    addPageIfNeeded();
    currentCredit = this.totalAddMoney; // Reset current credit to the total add money

    // Add section title for Spend Money transactions
    doc.setFontSize(14);
    doc.setTextColor(255, 0, 0);
    doc.text('Spend Money Transactions', 14, startY);

    startY += lineHeight;
    addPageIfNeeded();

    // Add headers for Spend Money transactions
    doc.setFontSize(12);
    doc.setTextColor(0);
    headers.forEach((header, index) => {
      doc.text(header, columnXPositions[index], startY);
    });

    startY += lineHeight;
    addPageIfNeeded();

    // Add data rows for Spend Money Transactions
    this.filteredSpendMoneyTransactions.forEach((transaction) => {
      currentCredit -= transaction.amount; // Subtract from current credit
      doc.text(transaction.id.toString(), columnXPositions[0], startY);
      doc.text(transaction.user.name, columnXPositions[1], startY);
      doc.text(transaction.amount.toFixed(2), columnXPositions[2], startY);
      doc.text(transaction.description, columnXPositions[3], startY);
      doc.text(
        new Date(transaction.transactionDateTime).toLocaleDateString(),
        columnXPositions[4],
        startY
      );
      doc.text(currentCredit.toFixed(2), columnXPositions[5], startY); // Show current credit

      startY += lineHeight;
      addPageIfNeeded();
    });

    // Display the total Spend Money amount and transaction count for filtered transactions
    startY += 5;
    addPageIfNeeded();
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Total Spend Money:', 54, startY);
    doc.text(this.totalSpendMoney.toFixed(2), 94, startY);
    doc.text(
      `Total Transactions: ${this.filteredSpendMoneyTransactions.length}`,
      134,
      startY
    );

    // Add the CURRENT Credit display at the bottom of the last page
    addPageIfNeeded();
    const rectWidth = 80;
    const rectHeight = 20;
    const rectX = doc.internal.pageSize.getWidth() - rectWidth - 10; // Align to the bottom right corner
    const rectY = doc.internal.pageSize.getHeight() - rectHeight - 10; // Bottom of the page

    doc.setDrawColor(0);
    doc.setFillColor(0, 102, 204); // Set fill color for the rectangle (blue)
    doc.rect(rectX, rectY, rectWidth, rectHeight, 'F'); // Draw filled rectangle

    // Display the final current credit inside the rectangle
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(255, 255, 255); // Set text color to white
    doc.text(
      `CURRENT Credit: ${currentCredit.toFixed(2)}`,
      rectX + 5,
      rectY + 14
    );

    // Save the PDF
    doc.save('transactions.pdf');
  }

  editTransaction(transactionId: number) {
    this.router.navigate(['/admin/edit-transaction', transactionId]);
  }
}
