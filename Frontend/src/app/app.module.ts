import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatCardModule } from '@angular/material/card';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ProfileComponent } from './components/profile/profile.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MatIconModule } from '@angular/material/icon';
import { SearchComponent } from './components/search/search.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { MessagesComponent } from './components/messages/messages.component';
import { SettingsComponent } from './components/settings/settings.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { ListingComponent } from './components/caregivers/listing/listing.component';
import { DetailsComponent } from './components/caregivers/details/details.component';
import { AddComponent } from './components/caregivers/add/add.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { AgmCoreModule } from '@agm/core';
import { MatDialogModule } from '@angular/material/dialog';
// import { IgxAvatarModule } from 'igniteui-angular';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { EditProfileComponent } from './components/caregivers/edit-profile/edit-profile.component';
import { RateAndReviewsComponent } from './components/caregivers/rate-and-reviews/rate-and-reviews.component';
import { GoogleMapComponent } from './components/google-map/google-map.component';
import { SearchdetailsComponent } from './components/searchdetails/searchdetails.component';
import { AddcaregiverComponent } from './components/caregivers/addcaregiver/addcaregiver.component';
import { MessageitemComponent } from './components/messageitem/messageitem.component';
import { InboxComponent } from './components/inbox/inbox.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { SearchiconComponent } from './components/searchicon/searchicon.component';
import { RateComponent } from './components/rate/rate.component';

const config: SocketIoConfig = {
	url: "http://locahost:5000/",
	options: {
		transports: ['polling']
	}
}

@NgModule({
	declarations: [
		AppComponent,
		LoginComponent,
		RegisterComponent,
		ProfileComponent,
		DashboardComponent,
		SidebarComponent,
		SearchComponent,
		NotificationsComponent,
		MessagesComponent,
		SettingsComponent,
		ChangePasswordComponent,
		NavbarComponent,
		SpinnerComponent,
		ListingComponent,
		DetailsComponent,
		AddComponent,
		EditProfileComponent,
		RateAndReviewsComponent,
		GoogleMapComponent,
		SearchdetailsComponent,
		AddcaregiverComponent,
		MessageitemComponent,
		InboxComponent,
  ForgotPasswordComponent,
  SearchiconComponent,
  RateComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		AgmCoreModule.forRoot({
			apiKey: process.env.GOOGLE_API_KEY,
			libraries: ['places']
		}),
		ReactiveFormsModule,
		FormsModule,
		MatCardModule,
		MatFormFieldModule,
		MatInputModule,
		MatButtonModule,
		MatSidenavModule,
		MatIconModule,
		MatDividerModule,
		MatListModule,
		MatMenuModule,
		MatSnackBarModule,
		HttpClientModule,
		MatProgressSpinnerModule,
		MatTabsModule,
		MatSelectModule,
		MatSlideToggleModule,
		MatNativeDateModule,
		MatDatepickerModule,
		MatCheckboxModule,
		// IgxAvatarModule,
		MatDialogModule,
		SocketIoModule.forRoot(config)
	],
	providers: [],
	bootstrap: [AppComponent]
})

export class AppModule {
}
