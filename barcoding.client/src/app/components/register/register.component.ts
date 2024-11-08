import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';

import { AlertService, MessageSeverity } from '../../services/alert.service';
import { AuthService } from '../../services/auth.service';
import { AccountService } from '../../services/account.service';
import { ConfigurationService } from '../../services/configuration.service';
import { Utilities } from '../../services/utilities';
import { UserEdit } from '../../models/user-edit.model';
import { EqualValidator } from '../../shared/validators/equal.validator';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit, OnDestroy {
  isLoading = false;
  loginStatusSubscription: Subscription | undefined;

  registerForm = this.fb.nonNullable.group({
    userName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: this.fb.group({
      newPassword: ['', [Validators.required, Validators.pattern(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,}/)]],
      confirmPassword: ['', [Validators.required, EqualValidator('newPassword')]],
    })
  });

  @ViewChild('form', { static: true })
  private form!: NgForm;

  constructor(
    private alertService: AlertService,
    private authService: AuthService,
    private accountService: AccountService,
    private configurations: ConfigurationService,
    private fb: FormBuilder) {

  }

  ngOnInit() {
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
    return this.authService.isLoggedIn && !this.authService.isSessionExpired;
  }

  getNewUser(): UserEdit {
    const formModel = this.registerForm.value;
    const newUser = new UserEdit();

    newUser.userName = formModel.userName ?? '';
    newUser.email = formModel.email ?? '';
    newUser.newPassword = formModel.password?.newPassword ?? '';

    return newUser;
  }

  register() {
    if (!this.form.submitted) {
      // Causes validation to update.
      this.form.onSubmit(null as unknown as Event);
      return;
    }

    if (!this.registerForm.valid) {
      this.alertService.showValidationError();
      return;
    }

    this.isLoading = true;
    this.alertService.startLoadingMessage('', 'Registering new user...');

    this.accountService.newUser(this.getNewUser(), true)
      .subscribe({ next: () => this.saveSuccessHelper(), error: error => this.saveFailedHelper(error) });
  }

  private saveSuccessHelper() {
    const user = this.getNewUser();
    this.alertService.stopLoadingMessage();
    this.alertService.showMessage('Success', `User account "${user.userName}" was created successfully`,
      MessageSeverity.success);

    this.login(user.userName, user.newPassword as string);
  }

  private saveFailedHelper(error: HttpErrorResponse) {
    this.isLoading = false;
    this.alertService.stopLoadingMessage();
    this.alertService.showStickyMessage('Save Error', 'The below errors occurred during registration:',
      MessageSeverity.error, error);
    this.alertService.showStickyMessage(error, null, MessageSeverity.error);
  }

  login(username: string, password: string) {
    this.isLoading = true;
    this.alertService.startLoadingMessage('', 'Attempting login...');

    this.authService.loginWithPassword({ userName: username, password, rememberMe: false })
      .subscribe({
        next: user => {
          setTimeout(() => {
            this.alertService.stopLoadingMessage();
            this.isLoading = false;
            this.registerForm.reset();

            this.alertService.showMessage('Login', `Welcome ${user.userName}!`, MessageSeverity.success);
            this.alertService.showStickyMessage('', 'Your account was created successfully', MessageSeverity.success);
          }, 500);
        },
        error: error => {
          this.alertService.stopLoadingMessage();

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
                `An error occurred whilst logging in, please try again later.\nError: ${Utilities.stringify(error)}`,
                MessageSeverity.error, error);
            }
          }
          setTimeout(() => {
            this.isLoading = false;
          }, 500);
        }
      });
  }

  mapLoginErrorMessage(error: string) {
    if (error === 'invalid_username_or_password') {
      return 'Invalid username or password';
    }

    return error;
  }

  get userName() {
    return this.registerForm.controls.userName;
  }

  get email() {
    return this.registerForm.controls.email;
  }

  get newPassword() {
    return this.registerForm.controls.password.controls.newPassword;
  }

  get confirmPassword() {
    return this.registerForm.controls.password.controls.confirmPassword;
  }
}
