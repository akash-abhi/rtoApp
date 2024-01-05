import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  isLoggedIn: boolean = false;
  currentUserData: any;



  constructor(private http:HttpClient) { }

  private springUrl = 'http://localhost:8080';

  getAllUserData(): Observable<any> {
    return this.http.get(
      `${this.springUrl}/get/all`
    );
  }
}
