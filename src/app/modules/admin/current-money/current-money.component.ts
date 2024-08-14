import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/services/auth/auth.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-current-money',
  templateUrl: './current-money.component.html',
  styleUrls: ['./current-money.component.scss'],
})
export class CurrentMoneyComponent implements OnInit {
  users: any[] = []; // Array to hold user data

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getAllUsers().subscribe(
      (data) => {
        this.users = data;
        console.log('users', this.users);
      },
      (error) => {
        console.error('Error fetching users', error);
      }
    );
  }
  downloadPDF() {
    const data = document.getElementById('pdfTable');

    if (data) {
      html2canvas(data)
        .then((canvas) => {
          const imgWidth = 208;
          const pageHeight = 295;
          const imgHeight = (canvas.height * imgWidth) / canvas.width;
          const heightLeft = imgHeight;

          const contentDataURL = canvas.toDataURL('image/png');
          const pdf = new jsPDF('p', 'mm', 'a4');
          const position = 0;
          pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
          pdf.save('CurrentMoneyDetails.pdf');
        })
        .catch((error) => {
          console.error('Error generating PDF:', error);
        });
    } else {
      console.error('Element with id "pdfTable" not found.');
    }
  }
}
