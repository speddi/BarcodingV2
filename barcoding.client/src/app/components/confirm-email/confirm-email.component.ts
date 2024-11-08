import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { AlertService, MessageSeverity } from '../../services/alert.service';
import { AccountService } from '../../services/account.service';
import { AuthService } from '../../services/auth.service';
import { Utilities } from '../../services/utilities';

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrl: './confirm-email.component.scss'
})
export class ConfirmEmailComponent implements OnInit {
  message?: string;
  isSuccess?: boolean;
  isLoading = false;

  constructor(
    private route: ActivatedRoute,
    private alertService: AlertService,
    private accountService: AccountService,
    private authService: AuthService) {

  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const loweredParams = Utilities.GetObjectWithLoweredPropertyNames(params);
      const userId = loweredParams['userid'];
      const code = loweredParams['code'];

      if (!userId || !code) {
        this.authService.gotoHomePage();
      } else {
        this.confirmEmail(userId, code);
      }
    });
  }

  confirmEmail(userId: string, code: string) {
    this.isLoading = true;
    this.alertService.startLoadingMessage('', 'Confirming account email...');

    this.accountService.confirmUserAccount(userId, code)
      .subscribe({ next: () => this.saveSuccessHelper(), error: error => this.saveFailedHelper(error, userId) });
  }

  private saveSuccessHelper() {
    this.alertService.stopLoadingMessage();
    this.isLoading = false;
    this.isSuccess = true;

    this.message = 'Thank you for confirming your email.';

    setTimeout(() => {
      this.alertService.showMessage('Email Confirmed', 'Your email address was successfully confirmed',
        MessageSeverity.success);
    }, 2000);
  }

  private saveFailedHelper(error: HttpErrorResponse, userId: string) {
    this.alertService.stopLoadingMessage();
    this.isLoading = false;
    this.isSuccess = false;

    this.message = `We were unable to confirm the email for user with ID "${userId}"`;

    setTimeout(() => {
      if (Utilities.checkNotFound(error) && Utilities.getResponseData(error) === userId) {
        this.alertService.showStickyMessage('Email Not Confirmed', `No user with id "${userId}" was found`,
          MessageSeverity.error, error);
      } else {
        const errorMessage = Utilities.getHttpResponseMessage(error);

        if (errorMessage) {
          this.alertService.showStickyMessage('Email Not Confirmed', errorMessage, MessageSeverity.error, error);
        } else {
          this.alertService.showStickyMessage('Email Not Confirmed',
            `An error occurred whilst confirming your email.\nError: ${Utilities.stringify(error)}`,
            MessageSeverity.error, error);
        }
      }
    }, 2000);
  }
}
