import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { MatExpansionPanel } from '@angular/material/expansion';
import { Subscription } from 'rxjs';

import { UserEditorComponent } from '../admin/user-editor/user-editor.component';
import { UserPreferencesComponent } from './user-preferences/user-preferences.component';
import { Permissions } from '../models/permission.model';
import { Role } from '../models/role.model';
import { User } from '../models/user.model';
import { AccountService } from '../services/account.service';
import { AlertService, MessageSeverity } from '../services/alert.service';
import { fadeInOut } from '../services/animations';
import { Utilities } from '../services/utilities';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
  animations: [fadeInOut]
})
export class SettingsComponent implements OnInit, OnDestroy, AfterViewInit {
  fragmentSubscription: Subscription | undefined;

  @ViewChild('profile', { static: true })
  profilePanel!: MatExpansionPanel;

  @ViewChild('preferences', { static: true })
  preferencesPanel!: MatExpansionPanel;

  @ViewChild(UserEditorComponent, { static: true })
  userProfile!: UserEditorComponent;

  @ViewChild(UserPreferencesComponent, { static: true })
  userPreferences!: UserPreferencesComponent;

  constructor(
    private alertService: AlertService,
    private router: Router,
    private route: ActivatedRoute,
    private accountService: AccountService
  ) { }

  ngOnInit() {
    this.fragmentSubscription = this.route.fragment.subscribe(anchor => {
      switch ((anchor || '').toLowerCase()) {
        case 'preferences':
          this.preferencesPanel.open();
          break;
        default:
          this.profilePanel.open();
      }
    });
  }

  ngAfterViewInit() {
    this.loadCurrentUserData();

    this.userProfile.userSaved$.subscribe(() => {
      this.alertService.showMessage('Success', 'Changes to your User Profile was saved successfully', MessageSeverity.success);
    });
  }

  ngOnDestroy() {
    this.fragmentSubscription?.unsubscribe();
  }

  public navigateToFragment(fragment: string) {
    if (fragment) {
      this.router.navigateByUrl(`/settings#${fragment}`);
    }
  }

  private loadCurrentUserData() {
    this.alertService.startLoadingMessage();

    if (this.canViewRoles) {
      this.accountService.getUserAndRoles().subscribe({
        next: results => this.onCurrentUserDataLoadSuccessful(results[0], results[1]),
        error: error => this.onCurrentUserDataLoadFailed(error)
      });
    } else {
      this.accountService.getUser().subscribe({
        next: user => this.onCurrentUserDataLoadSuccessful(user, user.roles.map(r => new Role(r))),
        error: error => this.onCurrentUserDataLoadFailed(error)
      });
    }
  }

  private onCurrentUserDataLoadSuccessful(user: User, roles: Role[]) {
    this.alertService.stopLoadingMessage();
    this.userProfile.setUser(user, roles);
  }

  private onCurrentUserDataLoadFailed(error: HttpErrorResponse) {
    this.alertService.stopLoadingMessage();
    this.alertService.showStickyMessage('Load Error',
      `Unable to retrieve user data from the server.\r\nError: "${Utilities.getHttpResponseMessage(error)}"`,
      MessageSeverity.error, error);
  }

  get canViewRoles() {
    return this.accountService.userHasPermission(Permissions.viewRoles);
  }
}
