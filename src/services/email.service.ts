import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  private emailJsonData = "../../assets/email.json"
  // private emailJsonData = "C:\Users\2122994\OneDrive - Cognizant\Desktop\RTO App\Email Part UI\emailUI\src\assets\email.json"
  constructor(private http:HttpClient) { }


  getEmaildata():Observable<any>{
    // console.log(this.);
    
    return this.http.get<any>(this.emailJsonData)
  }

}
