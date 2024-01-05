import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ManagetaskService } from 'src/services/managetask.service';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-managetasks',
  templateUrl: './managetasks.component.html',
  styleUrls: ['./managetasks.component.scss'],
})
export class ManagetasksComponent implements OnInit {
  taskDetailsForm!: FormGroup;

  constructor(
    private fB: FormBuilder,
    private manageService: ManagetaskService,
  ) {}

  taskId = new FormControl('', [Validators.required]);
  taskName = new FormControl('', [Validators.required]);
  taskStatus = new FormControl('', [Validators.required]);
  createdDate = new FormControl('', [Validators.required]);
  lastUpdatedDate = new FormControl('', [Validators.required]);
  taskDescription = new FormControl('', [Validators.required]);

  ngOnInit(): void {
    this.taskDetailsForm = this.fB.group({
      taskName: this.taskName,
      taskId: this.taskId,
      taskStatus: this.taskStatus,
      taskDescription: this.taskDescription,
      createdDate: this.createdDate,
      lastUpdatedDate: this.lastUpdatedDate,
    });
  }
 
  cancel() {}
  onFormSubmit() {
    this.manageService.createPlayers(this.taskDetailsForm.value).subscribe({
      next: (res: any) => {
        console.log(res);
      },
    });
  }
}
