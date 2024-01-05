import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
}) 
export class HomeComponent implements OnInit {

  constructor(public userService: UserService) { }

  firstName: any;

  ngOnInit(): void {
    this.firstName = this.userService.currentUserData.firstName;

  }

  

}
