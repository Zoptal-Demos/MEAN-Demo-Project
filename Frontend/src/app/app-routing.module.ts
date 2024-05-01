import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddComponent } from './components/caregivers/add/add.component';
import { AddcaregiverComponent } from './components/caregivers/addcaregiver/addcaregiver.component';
import { DetailsComponent } from './components/caregivers/details/details.component';
import { EditProfileComponent } from './components/caregivers/edit-profile/edit-profile.component';
import { ListingComponent } from './components/caregivers/listing/listing.component';
import { RateAndReviewsComponent } from './components/caregivers/rate-and-reviews/rate-and-reviews.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { GoogleMapComponent } from './components/google-map/google-map.component';
import { InboxComponent } from './components/inbox/inbox.component';
import { LoginComponent } from './components/login/login.component';
import { MessagesComponent } from './components/messages/messages.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { SearchComponent } from './components/search/search.component';
import { SearchdetailsComponent } from './components/searchdetails/searchdetails.component';
import { SettingsComponent } from './components/settings/settings.component';
import { AuthGuard } from './guards/auth.guard';
import { AuthenticGuard } from './guards/authentic.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  { path: 'forgot-password', component: ForgotPasswordComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: 'login' },
  {
    path: 'dashboard', component: DashboardComponent, children: [
      { path: 'profile', component: ProfileComponent, outlet: 'dashboard', canActivate: [AuthenticGuard] },
      { path: 'search', component: SearchComponent, outlet: 'dashboard', canActivate: [AuthenticGuard] },
      { path: 'searchdetails/:id', component : SearchdetailsComponent, outlet : 'dashboard', canActivate: [AuthenticGuard] },
      { path: 'notifications', component: NotificationsComponent, outlet: 'dashboard', canActivate: [AuthenticGuard] },
      { path: 'messages', component: InboxComponent, outlet: 'dashboard', canActivate: [AuthenticGuard] },
      { path: 'chat/:loggedin/:userId/:caregiver', component: MessagesComponent, outlet: 'dashboard', canActivate: [AuthenticGuard] },
      { path: 'list', component: ListingComponent, outlet: 'dashboard', canActivate: [AuthenticGuard] },
      { path: 'add', component: AddcaregiverComponent, outlet: 'dashboard', canActivate: [AuthenticGuard] },
      { path: 'detail/:id', component: DetailsComponent, outlet: 'dashboard', canActivate: [AuthenticGuard] },
      { path: 'rate/:id', component: RateAndReviewsComponent, outlet: 'dashboard', canActivate: [AuthenticGuard] },
      { path: 'edit-profile/:id', component: EditProfileComponent, outlet: 'dashboard', canActivate: [AuthenticGuard] },
      { path: 'change-password', component: ChangePasswordComponent, outlet: 'dashboard', canActivate: [AuthenticGuard] },
    ], canActivate: [AuthenticGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})

export class AppRoutingModule { }