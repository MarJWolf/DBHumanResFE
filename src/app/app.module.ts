import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router'
import { MatDialogModule} from '@angular/material/dialog';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import { HeaderComponent } from './pages/header/header.component';
import { FooterComponent } from './pages/footer/footer.component';
import {AuthGuard} from "./auth.guard";
import {MatMenuModule} from "@angular/material/menu";
import {MatListModule} from "@angular/material/list";
import { WLtableComponent } from './components/wltable/wltable.component';
import {MatTableModule} from "@angular/material/table";
import {CredentialsInterceptor} from "./interceptor/credentials.interceptor";
import { WldialogComponent } from './components/wldialog/wldialog.component';
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import { AllWorkleavesComponent } from './pages/all-workleaves/all-workleaves.component';
import { AllUsersComponent } from './pages/all-users/all-users.component';
import { AllInactiveUsersComponent } from './pages/all-inactive-users/all-inactive-users.component';
import { UdialogComponent } from './components/udialog/udialog.component';
import { SimpleDialogComponent } from './components/simple-dialog/simple-dialog.component';
import { CompanyCalendarComponent } from './pages/company-calendar/company-calendar.component';
import {MatCardModule} from "@angular/material/card";
import { OtherDataComponent } from './pages/other-data/other-data.component';
import { NameDialogComponent } from './components/name-dialog/name-dialog.component';
import { HolidayDialogComponent } from './components/holiday-dialog/holiday-dialog.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  { path: 'users', component: AllUsersComponent, canActivate: [AuthGuard]},
  { path: 'inactive-users', component: AllInactiveUsersComponent, canActivate: [AuthGuard]},
  { path: 'workleaves', component: AllWorkleavesComponent, canActivate: [AuthGuard]},
  { path: 'calendar', component: CompanyCalendarComponent, canActivate: [AuthGuard]},
  { path: 'other-data', component: OtherDataComponent, canActivate: [AuthGuard]},
  { path: '**', redirectTo: '/home', pathMatch: 'full' }
]
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    WLtableComponent,
    WldialogComponent,
    AllWorkleavesComponent,
    AllUsersComponent,
    AllInactiveUsersComponent,
    UdialogComponent,
    SimpleDialogComponent,
    CompanyCalendarComponent,
    OtherDataComponent,
    NameDialogComponent,
    HolidayDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatListModule,
    MatTableModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatCardModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass:CredentialsInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
