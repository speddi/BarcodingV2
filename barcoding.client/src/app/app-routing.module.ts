import { NgModule, Injectable } from '@angular/core';
import { RouterModule, Routes, DefaultUrlSerializer, UrlSerializer, UrlTree, TitleStrategy } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { AuthCallbackComponent } from './components/auth-callback/auth-callback.component';
import { RegisterComponent } from './components/register/register.component';
import { ConfirmEmailComponent } from './components/confirm-email/confirm-email.component';
import { RecoverPasswordComponent } from './components/recover-password/recover-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { HomeComponent } from './components/home/home.component';
import { SettingsComponent } from './settings/settings.component';
import { AboutComponent } from './components/about/about.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AppTitleService } from './services/app-title.service';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth-guard';
import { Utilities } from './services/utilities';

import { AgeModifierListComponent } from './components/maintenance/agemodifier/agemodifier-list.component';

@Injectable()
export class LowerCaseUrlSerializer extends DefaultUrlSerializer {
  override parse(url: string): UrlTree {
    const possibleSeparators = /[?;#]/;
    const indexOfSeparator = url.search(possibleSeparators);
    let processedUrl: string;

    if (indexOfSeparator > -1) {
      const separator = url.charAt(indexOfSeparator);
      const urlParts = Utilities.splitInTwo(url, separator);
      urlParts.firstPart = urlParts.firstPart.toLowerCase();

      processedUrl = urlParts.firstPart + separator + urlParts.secondPart;
    } else {
      processedUrl = url.toLowerCase();
    }

    return super.parse(processedUrl);
  }
}

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard], title: 'Home' },
  { path: 'login', component: LoginComponent, title: 'Login' },
  { path: 'google-login', component: AuthCallbackComponent, title: 'Google Login' },
  { path: 'facebook-login', component: AuthCallbackComponent, title: 'Facebook Login' },
  { path: 'twitter-login', component: AuthCallbackComponent, title: 'Twitter Login' },
  { path: 'microsoft-login', component: AuthCallbackComponent, title: 'Microsoft Login' },
  { path: 'register', component: RegisterComponent, title: 'Register' },
  { path: 'confirmemail', component: ConfirmEmailComponent, title: 'Confirm Email' },
  { path: 'recoverpassword', component: RecoverPasswordComponent, title: 'Recover Password' },
  { path: 'resetpassword', component: ResetPasswordComponent, title: 'Reset Password' },  
  { path: 'settings', component: SettingsComponent, canActivate: [AuthGuard], title: 'Settings' },

  { path: "maintenance/agemodifiers", component: AgeModifierListComponent, canActivate: [AuthGuard], data: { title: "Age Modifiers" } },

  { path: 'about', component: AboutComponent, title: 'About Us' },
  { path: 'home', redirectTo: '/', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent, title: 'Page Not Found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    AuthService,
    { provide: TitleStrategy, useClass: AppTitleService },
    { provide: UrlSerializer, useClass: LowerCaseUrlSerializer }]
})
export class AppRoutingModule { }
