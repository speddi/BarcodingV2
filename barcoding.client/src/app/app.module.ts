import { NgModule, ErrorHandler } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { OAuthModule, OAuthStorage } from 'angular-oauth2-oidc';
import { ToastaModule } from 'ngx-toasta';
import { NgChartsModule } from 'ng2-charts';
import { MatCarouselModule } from '@magloft/material-carousel';

import { AppRoutingModule } from './app-routing.module';
import { AppErrorHandler } from './app-error.handler';

import { SharedModule } from './shared/shared.module';
import { AdminModule } from './admin/admin.module';
import { SettingsModule } from './settings/settings.module';
import { FooterModule } from './shared/footer/footer.component';
import { ThemePickerModule } from './shared/theme-picker/theme-picker.component';

import { AppTranslationService, TranslateLanguageLoader } from './services/app-translation.service';
import { ConfigurationService } from './services/configuration.service';
import { AlertService } from './services/alert.service';
import { LocalStoreManager } from './services/local-store-manager.service';
import { OidcHelperService, OidcTempStorage } from './services/oidc-helper.service';
import { NotificationService } from './services/notification.service';
import { NotificationEndpoint } from './services/notification-endpoint.service';
import { AccountService } from './services/account.service';
import { AccountEndpoint } from './services/account-endpoint.service';


import { MaintenanceService } from './services/maintenance.service';
import { MaintenanceEndpoint } from './services/maintenance-endpoint.service';

import { AgeModifierListComponent } from './components/maintenance/agemodifier/agemodifier-list.component';
import { EditAgeModifierDialogComponent } from './components/maintenance/agemodifier/edit-agemodifier-dialog.component';
import { AgeModifierEditorComponent } from './components/maintenance/agemodifier/agemodifier-editor.component';


import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { LoginControlComponent } from './components/login/login-control.component';
import { LoginDialogComponent } from './components/login/login-dialog.component';
import { AuthCallbackComponent } from './components/auth-callback/auth-callback.component';
import { RegisterComponent } from './components/register/register.component';
import { ConfirmEmailComponent } from './components/confirm-email/confirm-email.component';
import { RecoverPasswordComponent } from './components/recover-password/recover-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { NotificationsViewerComponent } from './components/controls/notifications-viewer.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent, LoginControlComponent, LoginDialogComponent,
    AuthCallbackComponent,
    RegisterComponent,
    ConfirmEmailComponent,
    RecoverPasswordComponent,
    ResetPasswordComponent,
    HomeComponent,
    AboutComponent,
    NotFoundComponent,
    NotificationsViewerComponent,    
    AgeModifierListComponent,
    EditAgeModifierDialogComponent,
    AgeModifierEditorComponent

  ],
  imports: [
    SharedModule,
    FooterModule,
    ThemePickerModule,
    HttpClientModule,
    AdminModule,
    SettingsModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useClass: TranslateLanguageLoader
      }
    }),
    OAuthModule.forRoot(),
    ToastaModule.forRoot(),
    MatCarouselModule.forRoot(),
    NgChartsModule
  ],
  providers: [
    { provide: ErrorHandler, useClass: AppErrorHandler },
    { provide: OAuthStorage, useClass: OidcTempStorage },
    AlertService,
    ConfigurationService,
    AppTranslationService,
    NotificationService,
    NotificationEndpoint,
    AccountService,
    AccountEndpoint,
    MaintenanceService,
    MaintenanceEndpoint,
    LocalStoreManager,
    OidcHelperService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
