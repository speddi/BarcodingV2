import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { AlertDialog, DialogType } from '../../services/alert.service';
import { AppTranslationService } from '../../services/app-translation.service';

@Component({
  selector: 'app-dialog',
  templateUrl: 'app-dialog.component.html',
  styleUrl: 'app-dialog.component.scss'
})
export class AppDialogComponent {
  result: string | undefined;

  constructor(
    public dialogRef: MatDialogRef<AppDialogComponent>,
    private translationService: AppTranslationService,
    @Inject(MAT_DIALOG_DATA) private data: AlertDialog
  ) { }

  ok() {
    if (this.data.type === DialogType.prompt) {
      this.data.okCallback?.(this.result || this.data.defaultValue);
    } else {
      this.data.okCallback?.();
    }
    this.dialogRef.close();
  }

  cancel(): void {
    if (this.data.cancelCallback) {
      this.data.cancelCallback();
    }
    this.dialogRef.close();
  }

  get showTitle() {
    return this.data.title && this.data.title.length;
  }

  get title() {
    return this.data.title;
  }

  get message() {
    return this.data.message;
  }

  get okLabel() {
    return this.data.okLabel || 'OK';
  }

  get cancelLabel() {
    return this.data.cancelLabel || 'CANCEL';
  }

  get showCancel() {
    return this.data.type !== DialogType.alert;
  }

  get isPrompt() {
    return this.data.type === DialogType.prompt;
  }
}
