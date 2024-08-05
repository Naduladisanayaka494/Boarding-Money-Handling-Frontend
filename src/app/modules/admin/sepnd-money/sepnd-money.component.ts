import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/services/admin/admin.service';


interface User {
  id: number;
  name: string;
}
@Component({
  selector: 'app-sepnd-money',
  templateUrl: './sepnd-money.component.html',
  styleUrls: ['./sepnd-money.component.scss'],
})
export class SepndMoneyComponent implements OnInit {
  users: User[] = [];
  selectedUserId!: number;
  amount!: number;
  description!: string;
  successMessage!: string;
  errorMessage!: string;
  loading: boolean = false;

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers() {
    this.adminService.getAllStudents().subscribe((res: User[]) => {
      this.users = res;
    });
  }

  addMoney() {
    const MoneyRequest = {
      userId: this.selectedUserId,
      amount: this.amount,
      description: this.description,
    };

    this.loading = true;
    this.adminService
      .addMoney(MoneyRequest)
      .subscribe(
        (res: any) => {
          this.successMessage = 'Money added successfully!';
          this.errorMessage = '';
          this.resetForm();
        },
        (error) => {
          this.errorMessage = 'Failed to add money. Please try again.';
          this.successMessage = '';
        }
      )
      .add(() => {
        this.loading = false;
      });
  }

  spendMoney() {
    const MoneyRequest = {
      userId: this.selectedUserId,
      amount: this.amount,
      description: this.description,
    };

    this.loading = true;
    this.adminService
      .spendMoney(MoneyRequest)
      .subscribe(
        (res: any) => {
          this.successMessage = 'Money spend record added successfully!';
          this.errorMessage = '';
          this.resetForm();
        },
        (error) => {
          this.errorMessage = 'Failed to spend money. Please try again.';
          this.successMessage = '';
        }
      )
      .add(() => {
        this.loading = false;
      });
  }

  resetForm() {
    this.selectedUserId = 0;
    this.amount = 0;
    this.description = '';
  }
}
