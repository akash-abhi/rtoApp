import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}

  private springUrl = 'http://localhost:8080';

  loginUser(loginData:any): Observable<any> {
    return this.http.post(
      `${this.springUrl}/status-tracker/login`,
      loginData
      
    );
  }
}
