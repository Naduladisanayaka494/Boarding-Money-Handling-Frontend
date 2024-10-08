import { Component, ChangeDetectorRef } from '@angular/core';
import { StorageService } from './auth/services/storage/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'boarding-management';
  isStudentLoggedIn: boolean = StorageService.isStudentLoggedIn();
  isAdminLoggedIn: boolean = StorageService.isAdminLoggedIn();

  constructor(private router: Router, private cdRef: ChangeDetectorRef) {}

  ngOnInit() {
    this.router.events.subscribe((event) => {
        this.isAdminLoggedIn = StorageService.isAdminLoggedIn();
        this.isStudentLoggedIn = StorageService.isStudentLoggedIn();
        this.cdRef.detectChanges();

    });
  }

  logout() {
    StorageService.logout();
    this.isAdminLoggedIn = false;
    this.isStudentLoggedIn = false;
    this.router.navigateByUrl('/login').then(() => {
      this.cdRef.detectChanges();
    });
  }
}
