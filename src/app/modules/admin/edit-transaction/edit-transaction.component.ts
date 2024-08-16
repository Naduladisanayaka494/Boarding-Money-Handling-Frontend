import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../../services/admin/admin.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-transaction',
  templateUrl: './edit-transaction.component.html',
  styleUrls: ['./edit-transaction.component.scss'],
})
export class EditTransactionComponent implements OnInit {
  selectedUserId!: number;
  amount!: number;
  description!: string;
  transactionType!: string;
  users: any[] = [];
  successMessage!: string;
  errorMessage!: string;
  loading = false;
  transactionId!: number;

  constructor(
    private adminService: AdminService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const transactionIdParam =
      this.route.snapshot.paramMap.get('id');
    console.log(transactionIdParam);

    if (transactionIdParam) {
      this.transactionId = +transactionIdParam;
      this.loadTransactionDetails(this.transactionId);
    } else {
      this.errorMessage = 'Invalid transaction ID.';
    }

    this.loadAllUsers();
  }
  loadTransactionDetails(transactionId: number): void {
    this.adminService.getMoneyTransactions(transactionId).subscribe(
      (data) => {

        this.selectedUserId = data.user.id;
        this.amount = data.amount;
        this.description = data.description;
        this.transactionType = data.transactionType; 

        console.log("hi",data);
      },
      (error) => {

        this.errorMessage = 'Error loading transaction details.';
      }
    );
  }

  loadAllUsers(): void {
    this.adminService.getAllStudents().subscribe(
      (data) => {
        this.users = data;
      },
      (error) => {
        this.errorMessage = 'Error loading users.';
      }
    );
  }

  updateTransaction(): void {
    this.loading = true;

    const updateRequest = {
      userId: this.selectedUserId,
      amount: this.amount,
      description: this.description,
      transactionType: this.transactionType, // Include transaction type
    };

    this.adminService
      .updateTransaction(this.transactionId, updateRequest)
      .subscribe(
        (response) => {
          this.successMessage = 'Transaction updated successfully!';
          this.loading = false;
        },
        (error) => {
          this.errorMessage = 'Failed to update transaction.';
          this.loading = false;
        }
      );
  }
}
