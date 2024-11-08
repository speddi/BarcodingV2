import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, NgForm, Validators } from '@angular/forms';

import { AlertService, MessageSeverity } from '../../services/alert.service';
import { AuthService } from '../../services/auth.service';
import { AccountService } from '../../services/account.service';
import { Utilities } from '../../services/utilities';
import { EqualValidator } from '../../shared/validators/equal.validator';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent implements OnInit {
  isLoading = false;
  isSuccess = false;
  resetCode: string | undefined;

  resetPasswordForm = this.fb.nonNullable.group({
    usernameOrEmail: ['', Validators.required],
    password: this.fb.group({
      newPassword: ['', [Validators.required, Validators.pattern(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,}/)]],
      confirmPassword: ['', [Validators.required, EqualValidator('newPassword')]],
    })
  });

  @ViewChild('form')
  private form!: NgForm;

  constructor(
    private route: ActivatedRoute,
    private alertService: AlertService,
    private authService: AuthService,
    private accountService: AccountService,
    private fb: FormBuilder) {

  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const loweredParams = Utilities.GetObjectWithLoweredPropertyNames(params);
      this.resetCode = loweredParams['code'];

      if (!this.resetCode) {
        this.authService.gotoHomePage();
      }
    });
  }

  getUsernameOrEmail() {
    return this.resetPasswordForm.value.usernameOrEmail ?? '';
  }

  getNewPassword() {
    return this.resetPasswordForm.value.password?.newPassword ?? '';
  }

  resetPassword() {
    if (!this.form.submitted) {
      // Causes validation to update.
      this.form.onSubmit(null as unknown as Event);
      return;
    }

    if (!this.resetPasswordForm.valid) {
      this.alertService.showValidationError();
      return;
    }

    this.isLoading = true;
    this.alertService.startLoadingMessage('', 'Resetting password...');

    this.accountService.resetPassword(this.getUsernameOrEmail(), this.getNewPassword(), this.resetCode ?? '')
      .subscribe({ next: () => this.saveSuccessHelper(), error: error => this.saveFailedHelper(error) });
  }

  private saveSuccessHelper() {
    this.alertService.stopLoadingMessage();
    this.isLoading = false;
    this.isSuccess = true;
    this.alertService.showMessage('Password Change', 'Your password was successfully reset', MessageSeverity.success);
    this.authService.logout();
  }

  private saveFailedHelper(error: HttpErrorResponse) {
    this.alertService.stopLoadingMessage();
    this.isLoading = false;
    this.isSuccess = false;

    const errorMessage = Utilities.getHttpResponseMessage(error);

    if (errorMessage) {
      this.alertService.showStickyMessage('Password Reset Failed', errorMessage, MessageSeverity.error, error);
    } else {
      this.alertService.showStickyMessage('Password Reset Failed',
        `An error occurred whilst resetting your password.\nError: ${Utilities.stringify(error)}`,
        MessageSeverity.error, error);
    }
  }

  get usernameOrEmail() {
    return this.resetPasswordForm.controls.usernameOrEmail;
  }

  get newPassword() {
    return this.resetPasswordForm.controls.password.controls.newPassword;
  }

  get confirmPassword() {
    return this.resetPasswordForm.controls.password.controls.confirmPassword;
  }
}
