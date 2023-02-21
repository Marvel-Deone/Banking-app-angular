import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { authGuardServices } from 'auth/auth-guard.service';
import { AppRoutingModule } from './app-routing.module';


import { AppComponent } from './app.component';
import { HomeComponent } from './website/home/home.component';
// import { AccessRoutingModule } from './access/access-routing.module';
import { DashboardComponent } from './account/user/dashboard/dashboard.component';
import { AddAdminComponent } from './add-admin/add-admin.component';
import { AdminComponent } from './admin/admin.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { FooterComponent } from './public/footer/footer.component';
import { HeaderMenuComponent } from './public/header-menu/header-menu.component';
import { MenuComponent } from './public/menu/menu.component';
import { SidemenuComponent } from './public/sidemenu/sidemenu.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { ProfileComponent } from './account/profile/profile.component';
import { AccountSettingsComponent } from './account/account-settings/account-settings.component';
import { TransactionsComponent } from './account/transactions/transactions.component';


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HomeComponent,
    FooterComponent,
    SigninComponent,
    SignupComponent,
    AdminComponent,
    AddAdminComponent,
    PageNotFoundComponent,
    DashboardComponent,
    SidemenuComponent,
    HeaderMenuComponent,
    ProfileComponent,
    AccountSettingsComponent,
    TransactionsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatMenuModule
    // AccessRoutingModule

  ],
  providers: [authGuardServices],
  bootstrap: [AppComponent]
})
export class AppModule { }
