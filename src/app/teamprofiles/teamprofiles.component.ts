import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-teamprofiles',
  templateUrl: './teamprofiles.component.html',
  styleUrls: ['./teamprofiles.component.scss'],
})
export class TeamprofilesComponent implements OnInit {
  constructor(private userService: UserService) {}

  // UserVariables
  empName: any;
  offshorePOC: any;
  onshorePOC: any; 
  baselocation: any;
  password: any;
  emailId: any;
  empId: any;
  role: any;
  tasks: any;

  ngOnInit(): void {
    this.empName = this.userService.currentUserData.empName;
    this.offshorePOC = this.userService.currentUserData.offshorePOC;
    this.onshorePOC = this.userService.currentUserData.onshorePOC;
    this.baselocation = this.userService.currentUserData.baselocation;
    this.password = this.userService.currentUserData.password;
    this.emailId = this.userService.currentUserData.emailId;
    this.empId = this.userService.currentUserData.empId;
    this.role = this.userService.currentUserData.role;
    this.tasks = this.userService.currentUserData.tasks;
  }
}
