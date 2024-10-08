import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from 'src/app/auth/services/storage/storage.service';

const BASE_URL = 'http://localhost:8080';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private http: HttpClient) {}

  addMoney(MoneyRequest: any): Observable<any> {
    return this.http.post(BASE_URL + '/api/money/add', MoneyRequest, {
      headers: this.createAuthorizationHeader(),
    });
  }

  spendMoney(MoneyRequest: any): Observable<any> {
    return this.http.post(BASE_URL + '/api/money/spend', MoneyRequest, {
      headers: this.createAuthorizationHeader(),
    });
  }

  getAllStudents(): Observable<any> {
    return this.http.get(BASE_URL + '/api/money/students', {
      headers: this.createAuthorizationHeader(),
    });
  }

  getAllTransactions(): Observable<any> {
    return this.http.get(BASE_URL + '/api/money/all-transactions', {
      headers: this.createAuthorizationHeader(),
    });
  }

  updateTransaction(
    transactionId: number,
    MoneyUpdateRequest: any
  ): Observable<any> {
    return this.http.put(
      BASE_URL + `/api/money/update/${transactionId}`,
      MoneyUpdateRequest,
      {
        headers: this.createAuthorizationHeader(),
      }
    );
  }

  // New method to call the getMoneyTransactions API
  getMoneyTransactions(transactionId: number): Observable<any> {
    return this.http.get(BASE_URL + `/api/money/transaction/${transactionId}`, {
      headers: this.createAuthorizationHeader(),
    });
  }

  deleteTransaction(transactionId: number): Observable<any> {
    return this.http.delete(
      BASE_URL + `/api/money/delete/${transactionId}`, 
      {
        headers: this.createAuthorizationHeader(),
      }
    );
  }

  createAuthorizationHeader(): HttpHeaders {
    let authHeader: HttpHeaders = new HttpHeaders();
    return authHeader.set(
      'Authorization',
      'Bearer ' + StorageService.getToken()
    );
  }
}
