import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/services/user.service';
import * as users from '../files/user.json';
import * as admin from '../files/admin.json';
import { AdminService } from 'src/services/admin.service';
import { LoginService } from 'src/services/login.service';
import { RtoService } from 'src/services/rto.service';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { CalendarService } from 'src/services/calendar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  // Json DAta
  userloginData: any = users;
  adminLoginData: any = admin;
  allUsers: any;
  allAdmindata: any;

  rtoUserDataDate: any;

  userForm!: FormGroup;

  // Status

  loginStatus: boolean = false;
  nullStatus: boolean = false;

  constructor(
    private loginService: LoginService,
    private fB: FormBuilder,
    private router: Router,
    private userService: UserService,
    private adminService: AdminService,
    public rtoService: RtoService,
    private calendarService: CalendarService
  ) {}

  ngOnInit(): void {
    this.allUsers = this.userloginData.users;
    this.allAdmindata = this.adminLoginData.admin;

    this.userForm = this.fB.group({
      empId: null,
      password: '',
      usertype: '',
    });
  }

  onLogin() {
    let userObj = this.userForm.value;

    console.log(userObj);

    if (userObj.empId !== null && userObj.password != '') {
      this.loginService.loginUser(userObj).subscribe({
        next: (res: any) => {
          if (res.emailId != null) {
            this.userService.currentUserData = res;
            this.rtoService.currentUserData = res;

            this.rtoService.getRTOData().subscribe({
              next: (res: any) => {
                this.rtoService.AllRTOData = res;

                this.rtoService.AllRTODataCurrentUserData =
                  this.rtoService.AllRTOData.find(
                    (obj: any) =>
                      obj.empName == this.userService.currentUserData.empName
                  );
                if (
                  this.rtoService.AllRTODataCurrentUserData?.rtoStatus !=
                  undefined
                ) {
                  this.rtoService.events =
                    this.rtoService.AllRTODataCurrentUserData?.rtoStatus;
                  this.calendarService.updateEvents(
                    this.rtoService.AllRTODataCurrentUserData?.rtoStatus
                  );
                }
                this.rtoService.filterOfficeDays();
              },
            });

            this.loginStatus = false;
            this.nullStatus = false;
            this.userService.isLoggedIn = true;
            this.router.navigateByUrl('/home');

            this.rtoService.filterOfficeDays();
          } else if (res.emailId == null) {
            this.loginStatus = true;
            this.nullStatus = false;

          }
        },
      });
    }

    else{
      this.nullStatus = true;
      this.loginStatus = false;

    }
  }
}
