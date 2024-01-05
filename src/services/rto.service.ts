import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RtoService {
  constructor(private http: HttpClient) {}

  private springUrl = 'http://localhost:8080';

  AllRTOData: any = [];

  curr = new Date();
  officeDaysOfThatMonth: any = [];

  AllRTODataCurrentUserData: any = [];
  currentUserData: any;
  monthEvents: any = [];

  events: any = [];

  createRTOdata(data: any): Observable<any> {
    return this.http.post(
      `${this.springUrl}/status-tracker/user/rto/createRTO`,
      data
    );
  }
  filterOfficeDays() {
    const month = this.curr.getMonth();
    const year = this.curr.getFullYear();

    console.log();

    // Filtering objects with date in July
    this.monthEvents = this.events.filter(
      (obj: any) =>
        new Date(obj.date).getMonth() === month &&
        new Date(obj.date).getFullYear() === year
    );

    this.officeDaysOfThatMonth = this.monthEvents.filter(
      (obj: any) => obj.dayStatus == 'Office'
    );

    this.monthEvents.sort((a: any, b: any) => a.date.localeCompare(b.date));
  }

  getRTOData(): Observable<any> {
    return this.http.get(
      `${this.springUrl}/status-tracker/user/rto/get/allRTO`
    );
  }
}
