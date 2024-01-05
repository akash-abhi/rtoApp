import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { UserpageComponent } from './userpage/userpage.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ManageusersComponent } from './manageusers/manageusers.component';
import { ManagetasksComponent } from './managetasks/managetasks.component';
import { TeamprofilesComponent } from './teamprofiles/teamprofiles.component';
import { AuthGuard } from './authGuard/auth.guard';
import { AdminhomeComponent } from './adminhome/adminhome.component';
import { AdminauthGuard } from './authGuard/adminauth.guard';
import { EmailComponent } from './email/email.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'adminhome',
    component: HomeComponent,
    children: [
      {
        path: '',
        component: AdminhomeComponent,
        children: [
          { path: '', component: DashboardComponent },
          { path: 'dashboard', component: DashboardComponent },
          { path: 'managetasks', component: ManagetasksComponent },
          { path: 'manageuser', component: ManageusersComponent },
          { path: 'teamprofiles', component: TeamprofilesComponent },
          { path: 'email', component: EmailComponent }
          
        ],
      },
    ],
    canActivate: [AdminauthGuard],
  },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      {
        path: '',
        component: UserpageComponent,
        children: [
          { path: '', component: DashboardComponent },
          { path: 'dashboard', component: DashboardComponent },
          { path: 'managetasks', component: ManagetasksComponent },
          { path: 'manageuser', component: ManageusersComponent },
          { path: 'teamprofiles', component: TeamprofilesComponent },
          { path: 'email', component: EmailComponent }
        ],
      },
    ],
    canActivate: [AuthGuard],
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
