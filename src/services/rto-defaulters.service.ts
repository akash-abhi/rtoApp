import { Injectable } from '@angular/core';
import { RTODefaulterEmp } from 'src/app/model/RTODefaulterEmp.model';

@Injectable({
  providedIn: 'root'
})
export class RtoDefaultersService {


  public rtoDefaultersEmployees: RTODefaulterEmp[]=[
    {empId:2121855, emailId:'Akshitsood559@gmail.com',totalDays:10,baselocation:'Noida',selected:false},
    {empId:2122994, emailId:'akasheng07@gmail.com',totalDays:10,baselocation:'Kolkata',selected:false},
    
   ];

  constructor() { }

  getRTODefaulters():RTODefaulterEmp[]{
    return this.rtoDefaultersEmployees;
  }
}
