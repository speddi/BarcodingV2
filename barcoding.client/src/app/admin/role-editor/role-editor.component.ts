import { Component, Input, ViewChild, OnChanges } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { SelectionModel } from '@angular/cdk/collections';
import { NgForm, FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';

import { AlertService, MessageSeverity } from '../../services/alert.service';
import { AccountService } from '../../services/account.service';
import { Role } from '../../models/role.model';
import { Permission, Permissions } from '../../models/permission.model';


@Component({
  selector: 'app-role-editor',
  templateUrl: './role-editor.component.html',
  styleUrl: './role-editor.component.scss'
})
export class RoleEditorComponent implements OnChanges {
  selectedPermissions: SelectionModel<Permission>;
  isNewRole = false;
  private onRoleSaved = new Subject<Role>();
  roleSaved$ = this.onRoleSaved.asObservable();

  @ViewChild('form', { static: true })
  private form!: NgForm;

  @Input() role = new Role();
  @Input() allPermissions: Permission[] = [];

  roleForm = this.fb.nonNullable.group({
    name: ['', Validators.required],
    description: ''
  });

  constructor(
    private alertService: AlertService,
    private accountService: AccountService,
    private fb: FormBuilder
  ) {
    this.selectedPermissions = new SelectionModel<Permission>(true, []);
  }

  ngOnChanges() {
    if (this.role) {
      this.isNewRole = false;
    } else {
      this.isNewRole = true;
      this.role = new Role();
    }

    this.resetForm();
  }

  public save() {
    if (!this.form.submitted) {
      this.form.onSubmit(null as unknown as Event);
      return;
    }

    if (!this.roleForm.valid) {
      this.alertService.showValidationError();
      return;
    }

    this.alertService.startLoadingMessage('Saving changes...');

    const editedRole = this.getEditedRole();

    if (this.isNewRole) {
      this.accountService.newRole(editedRole).subscribe({
        next: role => this.saveSuccessHelper(role),
        error: error => this.saveFailedHelper(error)
      });

    } else {
      this.accountService.updateRole(editedRole).subscribe({
        next: () => this.saveSuccessHelper(editedRole),
        error: error => this.saveFailedHelper(error)
      });
    }
  }

  private getEditedRole(): Role {
    const formModel = this.roleForm.value;

    return {
      id: this.role.id,
      name: formModel.name ?? '',
      description: formModel.description ?? '',
      permissions: this.selectedPermissions.selected,
      usersCount: 0
    };
  }

  private saveSuccessHelper(role: Role) {
    this.alertService.stopLoadingMessage();

    if (this.isNewRole) {
      this.alertService.showMessage('Success', `Role "${role.name}" was created successfully`, MessageSeverity.success);
    } else {
      this.alertService.showMessage('Success', `Changes to role "${role.name}" was saved successfully`, MessageSeverity.success);
    }

    if (!this.isNewRole) {
      if (this.accountService.currentUser?.roles.some(r => r === this.role.name)) {
        this.refreshLoggedInUser();
      }

      role.usersCount = this.role.usersCount;
    }

    this.onRoleSaved.next(role);
  }

  private refreshLoggedInUser() {
    this.accountService.refreshLoggedInUser()
      .subscribe({
        error: error => {
          this.alertService.resetStickyMessage();
          this.alertService.showStickyMessage('Refresh failed', 'An error occurred whilst refreshing logged in user information from the server', MessageSeverity.error, error);
        }
      });
  }

  private saveFailedHelper(error: HttpErrorResponse) {
    this.alertService.stopLoadingMessage();
    this.alertService.showStickyMessage('Save Error', 'The below errors occurred whilst saving your changes:', MessageSeverity.error, error);
    this.alertService.showStickyMessage(error, null, MessageSeverity.error);
  }

  private cancel() {
    this.resetForm();

    this.alertService.resetStickyMessage();
  }

  private selectAll() {
    this.selectedPermissions.select(...this.allPermissions);
  }

  private toggleGroup(groupName: string) {
    const permissions = this.allPermissions.filter(p => p.groupName === groupName);

    if (permissions.length) {
      if (this.selectedPermissions.isSelected(permissions[0])) {
        this.selectedPermissions.deselect(...permissions);
      } else {
        this.selectedPermissions.select(...permissions);
      }
    }
  }

  private resetForm() {
    this.roleForm.reset({
      name: this.role.name || '',
      description: this.role.description || ''
    });

    const selectePermissions = this.role.permissions
      ? this.allPermissions.filter(x => this.role.permissions.find(y => y.value === x.value))
      : [];

    this.selectedPermissions = new SelectionModel<Permission>(true, selectePermissions);
  }

  get name() {
    return this.roleForm.controls.name;
  }

  get canManageRoles() {
    return this.accountService.userHasPermission(Permissions.manageRoles);
  }
}
