import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';

import { AlertService, MessageSeverity } from '../../services/alert.service';
import { AppTranslationService } from '../../services/app-translation.service';
import { NotificationService } from '../../services/notification.service';
import { AccountService } from '../../services/account.service';
import { Permissions } from '../../models/permission.model';
import { Utilities } from '../../services/utilities';
import { Notification } from '../../models/notification.model';

@Component({
  selector: 'app-notifications-viewer',
  templateUrl: './notifications-viewer.component.html',
  styleUrl: './notifications-viewer.component.scss'
})
export class NotificationsViewerComponent implements OnInit, AfterViewInit, OnDestroy {
  displayedColumns = ['date', 'header', 'actions'];
  dataSource: MatTableDataSource<Notification>;

  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;

  @ViewChild(MatSort, { static: true })
  sort!: MatSort;

  loadingIndicator = false;

  dataLoadingConsecutiveFailures = 0;
  dataLoadingSubscription: Subscription | undefined;

  constructor(
    private alertService: AlertService,
    private translationService: AppTranslationService,
    private accountService: AccountService,
    private notificationService: NotificationService,
    private snackBar: MatSnackBar
  ) {
    this.dataSource = new MatTableDataSource<Notification>();
  }

  ngOnInit() {
    this.initDataLoading();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy() {
    this.dataLoadingSubscription?.unsubscribe();
  }

  initDataLoading() {
    this.loadingIndicator = true;

    const dataLoadTask = this.notificationService.getNewNotificationsPeriodically();

    this.dataLoadingSubscription = dataLoadTask
      .subscribe({
        next: notifications => {
          this.loadingIndicator = false;
          this.dataLoadingConsecutiveFailures = 0;

          this.dataSource.data = notifications;
        },
        error: error => {
          this.loadingIndicator = false;

          this.alertService.showMessage('Load Error', 'Loading new notifications from the server failed!', MessageSeverity.warn);
          this.alertService.logError(error);

          if (this.dataLoadingConsecutiveFailures++ < 5) {
            setTimeout(() => this.initDataLoading(), 5000);
          } else {
            this.alertService.showStickyMessage('Load Error', 'Loading new notifications from the server failed!', MessageSeverity.error);
          }
        }
      });
  }

  getPrintedDate(value: Date) {
    if (value) {
      return Utilities.printTimeOnly(value) + ' on ' + Utilities.printDateOnly(value);
    }

    return '';
  }

  confirmDelete(notification: Notification) {
    this.snackBar.open(`Delete ${notification.header}?`, 'DELETE', { duration: 5000 })
      .onAction().subscribe(() => {
        this.alertService.startLoadingMessage('Deleting...');
        this.loadingIndicator = true;

        this.notificationService.deleteNotification(notification)
          .subscribe({
            next: () => {
              this.alertService.stopLoadingMessage();
              this.loadingIndicator = false;

              this.dataSource.data = this.dataSource.data.filter(item => item.id !== notification.id);
            },
            error: error => {
              this.alertService.stopLoadingMessage();
              this.loadingIndicator = false;

              this.alertService.showStickyMessage('Delete Error',
                `An error occurred whilst deleting the notification.\r\nError: "${Utilities.getHttpResponseMessage(error)}"`,
                MessageSeverity.error, error);
            }
          });
      });
  }

  togglePin(row: Notification) {
    const pin = !row.isPinned;
    const opText = pin ? 'Pinning' : 'Unpinning';

    this.alertService.startLoadingMessage(opText + '...');
    this.loadingIndicator = true;

    this.notificationService.pinUnpinNotification(row, pin)
      .subscribe({
        next: () => {
          this.alertService.stopLoadingMessage();
          this.loadingIndicator = false;

          row.isPinned = pin;
        },
        error: error => {
          this.alertService.stopLoadingMessage();
          this.loadingIndicator = false;

          this.alertService.showStickyMessage(opText + ' Error',
            `An error occurred whilst ${opText} the notification.\r\nError: "${Utilities.getHttpResponseMessage(error)}"`,
            MessageSeverity.error, error);
        }
      });
  }

  get canManageNotifications() {
    return this.accountService.userHasPermission(Permissions.manageRoles);
  }
}
