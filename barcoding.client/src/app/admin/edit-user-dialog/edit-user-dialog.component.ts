import { Component, ViewChild, Inject, AfterViewInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { User } from '../../models/user.model';
import { Role } from '../../models/role.model';

import { UserEditorComponent } from '../user-editor/user-editor.component';

@Component({
  selector: 'app-edit-user-dialog',
  templateUrl: 'edit-user-dialog.component.html',
  styleUrl: 'edit-user-dialog.component.scss'
})
export class EditUserDialogComponent implements AfterViewInit {
  @ViewChild(UserEditorComponent, { static: true })
  editUser!: UserEditorComponent;

  get userName() {
    return this.data.user ? { name: this.data.user.userName } : null;
  }

  constructor(
    public dialogRef: MatDialogRef<EditUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { user: User, roles: Role[] }) {
  }

  ngAfterViewInit() {
    this.editUser.userSaved$.subscribe(user => this.dialogRef.close(user));
  }

  cancel(): void {
    this.dialogRef.close(null);
  }
}
