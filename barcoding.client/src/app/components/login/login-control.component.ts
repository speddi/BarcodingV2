import { Component, OnInit, OnDestroy, Input, Output, ViewChild, EventEmitter } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { AlertService, MessageSeverity } from '../../services/alert.service';
import { AuthService } from '../../services/auth.service';
import { ConfigurationService } from '../../services/configuration.service';
import { Utilities } from '../../services/utilities';
import { UserLogin } from '../../models/user-login.model';


@Component({
  selector: 'app-login-control',
  templateUrl: './login-control.component.html',
  styleUrl: './login-control.component.scss'
})
export class LoginControlComponent implements OnInit, OnDestroy {
  isLoading = false;
  isGoogleLogin = false;
  isFacebookLogin = false;
  isTwitterLogin = false;
  isMicrosoftLogin = false;
  modalClosedCallback: { (): void } | undefined;
  loginStatusSubscription: Subscription | undefined;

  @ViewChild('form', { static: true })
  private form!: NgForm;

  @Input() isModal = false;
  @Output() enterKeyPress = new EventEmitter();

  loginForm = this.fb.nonNullable.group({
    userName: ['', Validators.required],
    password: ['', Validators.required],
    rememberMe: false as boolean
  });

  constructor(
    private alertService: AlertService,
    private authService: AuthService,
    private configurations: ConfigurationService,
    private fb: FormBuilder) {

  }

  ngOnInit() {
    this.loginForm.patchValue({
      rememberMe: this.authService.rememberMe
    });

    if (this.getShouldRedirect()) {
      this.authService.redirectLoginUser();
    } else {
      this.loginStatusSubscription = this.authService.getLoginStatusEvent()
        .subscribe(() => {
          if (this.getShouldRedirect()) {
            this.authService.redirectLoginUser();
          }
        });
    }
  }

  ngOnDestroy() {
    this.loginStatusSubscription?.unsubscribe();
  }

  getShouldRedirect() {
    return !this.isModal && this.authService.isLoggedIn && !this.authService.isSessionExpired;
  }

  closeModal() {
    if (this.modalClosedCallback) {
      this.modalClosedCallback();
    }
  }

  getUserLogin(): UserLogin {
    const formModel = this.loginForm.value;
    return new UserLogin(formModel.userName, formModel.password, formModel.rememberMe);
  }

  login() {
    if (!this.form.submitted) {
      this.form.onSubmit(null as unknown as Event);
      return;
    }

    if (!this.loginForm.valid) {
      this.alertService.showValidationError();
      return;
    }

    this.isLoading = true;
    this.isExternalLogin = false;
    this.alertService.startLoadingMessage('', 'Attempting login...');

    this.authService.loginWithPassword(this.getUserLogin())
      .subscribe({
        next: user => {
          setTimeout(() => {
            this.alertService.stopLoadingMessage();
            this.isLoading = false;
            this.loginForm.reset();

            if (!this.isModal) {
              this.alertService.showMessage('Login', `Welcome ${user.userName}!`, MessageSeverity.success);
            } else {
              this.alertService.showMessage('Login', `Session for ${user.userName} restored!`, MessageSeverity.success);
              setTimeout(() => {
                this.alertService.showStickyMessage('Session Restored', 'Please try your last operation again', MessageSeverity.default);
              }, 500);

              this.closeModal();
            }
          }, 500);
        },
        error: error => {
          this.alertService.stopLoadingMessage();

          if (Utilities.checkNoNetwork(error)) {
            this.alertService.showStickyMessage(Utilities.noNetworkMessageCaption, Utilities.noNetworkMessageDetail, MessageSeverity.error, error);
            this.offerAlternateHost();
          } else {
            const errorMessage = Utilities.getHttpResponseMessage(error);

            if (errorMessage) {
              this.alertService.showStickyMessage('Unable to login', this.mapLoginErrorMessage(errorMessage), MessageSeverity.error, error);
            } else {
              this.alertService.showStickyMessage('Unable to login',
                `An error occurred, please try again later.\nError: ${Utilities.stringify(error)}`, MessageSeverity.error, error);
            }
          }
          setTimeout(() => {
            this.isLoading = false;
          }, 500);
        }
      });
  }

  loginWithGoogle() {
    this.isLoading = true;
    this.isGoogleLogin = true;
    this.alertService.startLoadingMessage('', 'Redirecting to google...');

    this.authService.initLoginWithGoogle(this.getUserLogin().rememberMe);
  }

  loginWithFacebook() {
    this.isLoading = true;
    this.isFacebookLogin = true;
    this.alertService.startLoadingMessage('', 'Redirecting to facebook...');

    this.authService.initLoginWithFacebook(this.getUserLogin().rememberMe);
  }

  loginWithTwitter() {
    this.isLoading = true;
    this.isTwitterLogin = true;
    this.alertService.startLoadingMessage('', 'Redirecting to twitter...');

    this.authService.initLoginWithTwitter(this.getUserLogin().rememberMe);
  }

  loginWithMicrosoft() {
    this.isLoading = true;
    this.isMicrosoftLogin = true;
    this.alertService.startLoadingMessage('', 'Redirecting to microsoft...');

    this.authService.initLoginWithMicrosoft(this.getUserLogin().rememberMe);
  }

  get isExternalLogin() {
    return this.isGoogleLogin || this.isFacebookLogin || this.isTwitterLogin || this.isMicrosoftLogin;
  }

  set isExternalLogin(value: boolean) {
    this.isGoogleLogin = value;
    this.isFacebookLogin = value;
    this.isTwitterLogin = value;
    this.isMicrosoftLogin = value;
  }

  offerAlternateHost() {
    if (Utilities.checkIsLocalHost(location.origin) && Utilities.checkIsLocalHost(this.configurations.baseUrl)) {
      const apiUrl = prompt('Dear Developer!\nIt appears your backend Web API service is not running...\n' +
        'Would you want to temporarily switch to the online Demo API below?(Or specify another)', this.configurations.fallbackBaseUrl);

      if (apiUrl) {
        this.configurations.baseUrl = apiUrl;
        this.alertService.showStickyMessage('API Changed!', `The target Web API has been changed to: ${apiUrl}`, MessageSeverity.warn);
      }
    }
  }

  mapLoginErrorMessage(error: string) {
    if (error === 'invalid_username_or_password') {
      return 'Invalid username or password';
    }

    return error;
  }

  enterKeyDown() {
    this.enterKeyPress.emit();
  }

  get userName() {
    return this.loginForm.controls.userName;
  }

  get password() {
    return this.loginForm.controls.password;
  }
}
