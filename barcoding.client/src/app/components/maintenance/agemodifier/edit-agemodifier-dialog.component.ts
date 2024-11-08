import { Component, ViewChild, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { AgeModifier } from '../../../models/maintenance/agemodifier.model';

import { AgeModifierEditorComponent } from './agemodifier-editor.component';

@Component({
    selector: 'app-edit-agemodifier-dialog',
    templateUrl: 'edit-agemodifier-dialog.component.html',
    styleUrls: ['edit-agemodifier-dialog.component.scss']
})
export class EditAgeModifierDialogComponent
{
    @ViewChild(AgeModifierEditorComponent)
    editEntity!: AgeModifierEditorComponent;

    get entityName() : any
    {
        return this.data.entity ? { name: this.data.entity.description } : null;
    }

    constructor(
        public dialogRef: MatDialogRef<EditAgeModifierDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { entity: AgeModifier })
    {
    }

    ngAfterViewInit()
    {
        this.editEntity.entitySaved$.subscribe((entity: any) => this.dialogRef.close(entity))
    }

    cancel(): void
    {
        this.dialogRef.close(null);
    }
}
