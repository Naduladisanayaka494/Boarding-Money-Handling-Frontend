import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from 'src/app/auth/services/storage/storage.service';

const BASE_URL = 'http://localhost:8080/api/money';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  constructor(private http: HttpClient) {}

  createAuthorizationHeader(): HttpHeaders {
    let authHeader: HttpHeaders = new HttpHeaders();
    return authHeader.set(
      'Authorization',
      'Bearer ' + StorageService.getToken()
    );
  }

  getMoneyTransactions(): Observable<any> {
    const userId = StorageService.getUserId();
    const headers = this.createAuthorizationHeader();
    return this.http.get(`${BASE_URL}/transactions`, {
      headers: headers,
      params: { userId: userId },
    });
  }
}
