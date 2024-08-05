import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/services/admin/admin.service';

// Define the User interface
interface User {
  id: number;
  name: string;
}

@Component({
  selector: 'app-add-money',
  templateUrl: './add-money.component.html',
  styleUrls: ['./add-money.component.scss'],
})
export class AddMoneyComponent implements OnInit {
  users: User[] = []; // Update the type of users
  selectedUserId!: number;
  amount!: number;
  description!: string;
  successMessage!: string;
  errorMessage!: string;

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers() {
    this.adminService.getAllStudents().subscribe((res: User[]) => {
      this.users = res;
      console.log(res);
    });
  }

  addMoney() {
    const MoneyRequest = {
      userId: this.selectedUserId,
      amount: this.amount,
      description: this.description,
    };

    this.adminService.addMoney(MoneyRequest).subscribe((res: any) => {
      this.resetForm();
    });
  }

  resetForm() {
    this.selectedUserId = 0;
    this.amount = 0;
    this.description = '';
  }
}
