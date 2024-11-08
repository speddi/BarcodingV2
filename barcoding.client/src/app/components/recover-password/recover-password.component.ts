import { Component, ViewChild } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

import { AlertService, MessageSeverity } from '../../services/alert.service';
import { AccountService } from '../../services/account.service';
import { Utilities } from '../../services/utilities';


@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrl: './recover-password.component.scss'
})
export class RecoverPasswordComponent {
  isLoading = false;
  isSuccess = false;

  recoverPasswordForm = this.fb.nonNullable.group({
    usernameOrEmail: ['', Validators.required]
  });

  @ViewChild('form')
  private form!: NgForm;

  constructor(
    private alertService: AlertService,
    private accountService: AccountService,
    private fb: FormBuilder) {
  }

  getUsernameOrEmail() {
    return this.recoverPasswordForm.value.usernameOrEmail ?? '';
  }

  recover() {
    if (!this.form.submitted) {
      // Causes validation to update.
      this.form.onSubmit(null as unknown as Event);
      return;
    }

    if (!this.recoverPasswordForm.valid) {
      this.alertService.showValidationError();
      return;
    }

    this.isLoading = true;
    this.alertService.startLoadingMessage('', 'Generating password reset mail...');

    this.accountService.recoverPassword(this.getUsernameOrEmail())
      .subscribe({ next: () => this.saveSuccessHelper(), error: error => this.saveFailedHelper(error) });
  }

  private saveSuccessHelper() {
    this.alertService.stopLoadingMessage();
    this.isLoading = false;
    this.isSuccess = true;
    this.alertService.showMessage('Recover Password', 'Password reset email sent', MessageSeverity.success);
  }

  private saveFailedHelper(error: HttpErrorResponse) {
    this.alertService.stopLoadingMessage();
    this.isLoading = false;
    this.isSuccess = false;

    const errorMessage = Utilities.getHttpResponseMessage(error);

    if (errorMessage) {
      this.alertService.showStickyMessage('Password Recovery Failed', errorMessage, MessageSeverity.error, error);
    } else {
      this.alertService.showStickyMessage('Password Recovery Failed',
        `An error occurred whilst recovering your password.\nError: ${Utilities.stringify(error)}`,
        MessageSeverity.error, error);
    }
  }

  get usernameOrEmail() {
    return this.recoverPasswordForm.controls.usernameOrEmail;
  }
}
