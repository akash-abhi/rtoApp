import { Component, OnInit,ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { EmailService } from 'src/services/email.service';
import { RtoDefaultersService } from 'src/services/rto-defaulters.service';

import { UserService } from 'src/services/user.service';
import { RTODefaulterEmp } from '../model/RTODefaulterEmp.model';




@Component({
  selector: 'app-email',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss']
})
export class EmailComponent implements OnInit {

  
  emailForm!:FormGroup;
  senderMail = new FormControl('akash@gmail.com');
  toEmail = new FormControl('');
  
  subject = new FormControl('');
  body = new FormControl('');
  templateId = new FormControl('t123');
  

  emailData:any;

  allEmails=[];
  allUsers:any;

  templates:any;

  selectedTemplate:any;



  rtoDefaultersEmployees: RTODefaulterEmp[]=[];
  selectAll: boolean = false;
  


  selectedEmployees:RTODefaulterEmp[]=[];
  selectedEmails:String[]=[];

  isTemplateViewPopupVisible = false;

  togglePopup():void{
    this.isTemplateViewPopupVisible = !this.isTemplateViewPopupVisible;
  }

  onCheckBoxClicked(){
    this.selectedEmployees = this.rtoDefaultersEmployees.filter(emp=>emp.selected);
    //console.log(this.selectedEmployees);
    this.selectedEmails = this.selectedEmployees.map(emp => emp.emailId);
    //console.log(this.selectedEmails);

  }

  onShowSelected(){
    // console.log(this.rtoDefaultersEmployees);
    const selectedEmployees = this.rtoDefaultersEmployees.filter(emp=>emp.selected);
    // console.log('selected employees:', selectedEmployees);
    // console.log(this.rtoDefaultersEmployees);

  }


  onSelectAllChange(){
    for(const emp of this.rtoDefaultersEmployees){
      emp.selected = this.selectAll;
    }
    this.onCheckBoxClicked();
  }

  constructor(private emailSer:EmailService,private userService:UserService,
    private fb:FormBuilder,private rtoDefaulterService: RtoDefaultersService) { 

     

      }

  ngOnInit(): void {

    
    
    this.templates=[
      {tId:1,tName:"Fill RTO Template",tSub:"RTO Remainder",tBody:"Please Fill the RTO by 11 AM"},
      {tId:2,tName:"RTO Defaulters Template",tSub:"RTO Defaulter",tBody:"Please Fill the RTO ASAP"},
      {tId:3,tName:"Default Template",tSub:"Default Subject",tBody:"Default Body"},
      
      
    ];
  
    // this.selectedTemplate = this.templates.length>0 ? this.templates[0].tId:null;
    

    this.emailForm = this.fb.group({
      
      senderMail: this.senderMail,
      toEmail: this.fb.array(this.allEmails),
     
      subject: this.subject,
      body: this.body,
      templateId:this.templateId
    });

    

    // this.emailForm = {
      
    //   senderMail: this.senderMail,
    //   toEmail: this.fb.array(this.emailArray),
    //   dateAndTime: this.dateAndTime,
    //   subject: this.subject,
    //   body: this.body,
    // };


//     this.emailSer.getEmaildata().subscribe(res=>{
// this.emailData=res;
// console.log(res);




//     })
  }


  sendEmail(){

   

    // this.emailForm = {
      
    //   senderMail: this.senderMail,
    //   toEmail: this.toEmail,
    //   dateAndTime: this.dateAndTime,
    //   subject: this.subject,
    //   body: this.body,
    // };
    console.log(typeof this.allEmails);
    this.emailForm = this.fb.group({
      
      senderMail: this.senderMail,
      toEmail: this.fb.array(this.selectedEmails),
      
      subject: this.subject,
      body: this.body,
      templateId:this.templateId
    });

  
    console.log(this.emailForm.value);

  }

  
  

  
  getAllEmail(){
    // this.userService.getAllUserData().subscribe({
    //   next: (res: any) => {
    //     this.allUsers = res;
    //     console.log(this.allUsers);
    //     this.allEmails = this.allUsers.map((obj:any)=>obj.emailId);
    //     // this.emailForm.toEmail = this.allEmails;
    //     console.log(this.allEmails);
    //   },
    // })


    this.rtoDefaultersEmployees = this.rtoDefaulterService.getRTODefaulters();
  }

  onSubmit(){}


}
