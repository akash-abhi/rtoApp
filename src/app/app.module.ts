import { NgModule,ChangeDetectionStrategy } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarService } from 'src/services/calendar.service'; 



import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgxPaginationModule } from 'ngx-pagination';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { UserpageComponent } from './userpage/userpage.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ManagetasksComponent } from './managetasks/managetasks.component';
import { ManageusersComponent } from './manageusers/manageusers.component';
import { TeamprofilesComponent } from './teamprofiles/teamprofiles.component';
import { AdminpageComponent } from './adminpage/adminpage.component';
import { AdminhomeComponent } from './adminhome/adminhome.component';
import { EmailComponent } from './email/email.component';
import { TemplateViewComponent } from './popup/template-view/template-view.component';





@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    UserpageComponent,
    DashboardComponent,
    ManagetasksComponent,
    ManageusersComponent,
    TeamprofilesComponent,
    AdminpageComponent,
    AdminhomeComponent,
    EmailComponent,
    TemplateViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,    
    NgxPaginationModule,
    FullCalendarModule,
  

   
    
    

  ],
  providers: [CalendarService],
  bootstrap: [AppComponent]
})
export class AppModule { }
