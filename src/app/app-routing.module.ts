import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { authGuardServices } from 'auth/auth-guard.service';
import { authGuardServices } from 'auth/auth-guard.service';
import { AccountSettingsComponent } from './account/account-settings/account-settings.component';
import { ProfileComponent } from './account/profile/profile.component';
import { TransactionsComponent } from './account/transactions/transactions.component';
import { DashboardComponent } from './account/user/dashboard/dashboard.component';
import { AddAdminComponent } from './add-admin/add-admin.component';
import { AdminComponent } from './admin/admin.component';
import { AuthGuard } from './auth/auth.guard';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './website/home/home.component';

const routes: Routes = [
  { path: '', redirectTo: 'landing-page', pathMatch: 'full' },
  { path: 'landing-page', component: HomeComponent },
  // { path: 'landing-page', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'sign-in', component: SigninComponent },
  { path: 'sign-up', component: SignupComponent },
  {
    path: 'admin', component: AdminComponent, children: [
      { path: 'add', component: AddAdminComponent },
      { path: 'edit/:id', component: AddAdminComponent }
    ],
    canActivate: [AuthGuard]
  },
  { path: "access", loadChildren: () => import('./access/access.module').then(opt => opt.AccessModule) },
  { path: 'user', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'user/dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'user/profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'user/account-setting', component: AccountSettingsComponent, canActivate: [AuthGuard] },
  { path: 'user/my-transactions', component: TransactionsComponent, canActivate: [AuthGuard] },
  { path: "**", component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
