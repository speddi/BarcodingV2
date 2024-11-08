import { Component, OnInit, AfterViewInit, OnDestroy, ViewChildren, QueryList } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { AlertService, MessageSeverity } from '../../services/alert.service';
import { AuthService, OidcProviders } from '../../services/auth.service';
import { Utilities } from '../../services/utilities';

@Component({
  selector: 'app-auth-callback',
  templateUrl: './auth-callback.component.html',
  styleUrl: './auth-callback.component.scss'
})
export class AuthCallbackComponent implements OnInit, AfterViewInit, OnDestroy {
  message: string | null = null;
  isLoading = false;
  provider!: OidcProviders;
  externalAuthToken: string | undefined;
  pageSubscriptions = new Subscription();

  loginForm = this.fb.nonNullable.group({
    email: this.fb.control({ value: '', disabled: true }),
    password: ['', Validators.required]
  });

  @ViewChildren('form')
  private forms!: QueryList<NgForm>;
  private form!: NgForm;

  constructor(
    private route: ActivatedRoute,
    private alertService: AlertService,
    private authService: AuthService,
    private fb: FormBuilder) {

  }

  ngOnInit() {
    if (this.getShouldRedirect()) {
      this.authService.redirectLoginUser();
      return;
    } else {
      this.pageSubscriptions.add(
        this.authService.getLoginStatusEvent().subscribe(() => {
          if (this.getShouldRedirect()) {
            this.authService.redirectLoginUser();
          }
        }));
    }

    this.setProvider(this.route.snapshot.url[0].path);
    this.isLoading = true;

    if (this.provider === 'twitter') {
      this.route.queryParams.subscribe(params => {
        const queryParams = Utilities.GetObjectWithLoweredPropertyNames(params);
        this.processTokens(queryParams);
      });
    }
    else {
      this.pageSubscriptions.add(
        this.authService.processExternalOidcLoginTokens(this.provider).subscribe({
          next: tokens => {
            this.processTokens(tokens);
          },
          error: error => {
            this.isLoading = false;
            this.message = null;
            this.showLoginErrorMessage(error);
          }
        }));
    }
  }

  ngAfterViewInit() {
    this.pageSubscriptions.add(
      this.forms.changes.subscribe(() => this.form = this.forms.first)
    );
  }

  ngOnDestroy() {
    this.pageSubscriptions.unsubscribe();
  }

  getShouldRedirect() {
    return this.authService.isLoggedIn && !this.authService.isSessionExpired;
  }

  setProvider(url: string) {
    const google = 'google';
    const facebook = 'facebook';
    const twitter = 'twitter';
    const microsoft = 'microsoft';

    if (url.includes(google)) {
      this.provider = google;
    } else if (url.includes(facebook)) {
      this.provider = facebook;
    } else if (url.includes(twitter)) {
      this.provider = twitter;
    } else if (url.includes(microsoft)) {
      this.provider = microsoft;
    }
    else {
      throw new Error('Unknown login provider');
    }
  }

  processTokens(tokensObject: Params) {
    let tokenProcessed = false;

    if (tokensObject) {
      if (tokensObject['id_token']) {
        tokenProcessed = true;
        this.loginWithToken(tokensObject['id_token'], this.provider);
      }
      else if (tokensObject['oauth_token'] && tokensObject['oauth_verifier']) {
        if (this.provider === 'twitter') {
          tokenProcessed = true;
          this.isLoading = true;
          this.message = 'Connecting to twitter...';
          this.authService.getTwitterAccessToken(tokensObject['oauth_token'], tokensObject['oauth_verifier'])
            .subscribe({
              next: accessToken => {
                this.isLoading = true;
                this.message = 'Processing...';
                this.loginWithToken(accessToken, this.provider);
              },
              error: error => {
                this.isLoading = false;
                this.message = null;
                this.showLoginErrorMessage(error);
              }
            });
        }
      }
    }

    if (!tokenProcessed) {
      setTimeout(() => {
        this.alertService.showMessage('Invalid login', 'No valid tokens found', MessageSeverity.error);
      }, 500);

      this.message = 'Error.';
      this.authService.redirectLogoutUser();
    }
  }

  loginWithToken(token: string, provider: string) {
    this.externalAuthToken = token;
    this.isLoading = true;
    this.message = 'Processing...';
    this.alertService.startLoadingMessage('', 'Signing in...');

    this.authService.loginWithExternalToken(token, provider)
      .subscribe({
        next: user => {
          setTimeout(() => {
            this.alertService.stopLoadingMessage();
            this.isLoading = false;

            this.alertService.showMessage('Login', `Welcome ${user.userName}!`, MessageSeverity.success);
          }, 500);
        },
        error: error => {
          this.alertService.stopLoadingMessage();
          this.isLoading = false;
          this.message = 'Error.';
          this.foundEmail = Utilities.findHttpResponseMessage('email', error);

          if (this.foundEmail) {
            const errorMessage = Utilities.getHttpResponseMessage(error) as string;
            this.alertService.showStickyMessage('User already exists',
              this.mapLoginErrorMessage(errorMessage), MessageSeverity.default, error);
          } else {
            this.showLoginErrorMessage(error);
          }
        }
      });
  }

  linkAccountAndLogin() {
    if (!this.form.submitted) {
      this.form.onSubmit(null as unknown as Event);
      return;
    }

    if (!this.loginForm.valid) {
      this.alertService.showValidationError();
      return;
    }

    this.isLoading = true;
    this.alertService.startLoadingMessage('', 'Attempting login...');

    this.authService.loginWithExternalToken(this.externalAuthToken as string, this.provider, this.userPassword)
      .subscribe({
        next: user => {
          setTimeout(() => {
            this.alertService.stopLoadingMessage();
            this.isLoading = false;
            this.userPassword = '';

            this.alertService.showMessage('Login', `Welcome ${user.userName}!`, MessageSeverity.success);
          }, 500);
        },
        error: error => {
          this.alertService.stopLoadingMessage();
          this.showLoginErrorMessage(error, false);

          setTimeout(() => {
            this.isLoading = false;
          }, 500);
        }
      });
  }

  showLoginErrorMessage(error: HttpErrorResponse, redirect = true) {
    setTimeout(() => {
      if (Utilities.checkNoNetwork(error)) {
        this.alertService.showStickyMessage(Utilities.noNetworkMessageCaption, Utilities.noNetworkMessageDetail,
          MessageSeverity.error, error);
      } else {
        const errorMessage = Utilities.getHttpResponseMessage(error);

        if (errorMessage) {
          this.alertService.showStickyMessage('Unable to login', this.mapLoginErrorMessage(errorMessage),
            MessageSeverity.error, error);
        } else {
          this.alertService.showStickyMessage('Unable to login',
            `An error occurred, please try again later.\nError: ${Utilities.stringify(error)}`,
            MessageSeverity.error, error);
        }
      }

    }, 500);

    if (redirect) {
      this.authService.redirectLogoutUser();
    }
  }

  mapLoginErrorMessage(error: string) {
    if (error === 'invalid_username_or_password') {
      return 'Invalid username or password';
    }

    return error;
  }

  get passwordControl() {
    return this.loginForm.controls.password;
  }

  get foundEmail() {
    return this.loginForm.getRawValue().email;
  }
  set foundEmail(email: string | null) {
    this.loginForm.patchValue({ email });
  }

  get userPassword(): string {
    return this.loginForm.value.password ?? '';
  }
  set userPassword(password: string) {
    this.loginForm.patchValue({ password });
  }
}
