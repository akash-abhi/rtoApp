import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' 
})
export class ManagetaskService {

  constructor(private http: HttpClient) {}


  
  springport: number = 8083;

  private springUrl = "http://localhost:8080";


  createPlayers(taskDetails: any): Observable<any> {
    return this.http.post(`${this.springUrl}/status-tracker/user/add/taskDetails`, taskDetails);
  }

  
}
