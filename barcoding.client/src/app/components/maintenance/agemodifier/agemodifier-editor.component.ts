import { Component, OnDestroy, ViewChild, Input, Output, OnChanges, EventEmitter } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, Validators, AbstractControl, FormControl } from '@angular/forms';
import { FloatLabelType } from '@angular/material/form-field';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';



import { Subject, Subscription } from 'rxjs';

import { AccountService } from "../../../services/account.service";
import { MaintenanceService } from "../../../services/maintenance.service";
import { AlertService, MessageSeverity } from '../../../services/alert.service';
import { AppTranslationService } from '../../../services/app-translation.service';
import { AgeModifier } from '../../../models/maintenance/agemodifier.model';
import { AgeModifierEdit } from '../../../models/maintenance/agemodifier-edit.model';
import { Permission } from '../../../models/permission.model';

@Component({
    selector: 'agemodifier-editor',
    templateUrl: './agemodifier-editor.component.html',
    styleUrls: ['./agemodifier-editor.component.scss']
})
export class AgeModifierEditorComponent implements OnChanges, OnDestroy {
    @ViewChild('form')
    private form!: NgForm;

    isNewEntity = false;
    isChangePassword = false;
    private isSaving = false;
    private onEntitySaved = new Subject<AgeModifier>();
    loadingIndicator = true;

    @Input() entity: AgeModifier = new AgeModifier();
    @Input() isEditMode: boolean = false;

    //entityForm: FormGroup;
    entityForm = this.formBuilder.nonNullable.group({
      description: ['', Validators.required],
      isEnabled: false
    });
    entitySaved$ = this.onEntitySaved.asObservable();

  //  get investigatorName() {
  //      return this.entityForm.get('investigatorName');
  //}

    get floatLabels(): FloatLabelType {
        return this.isEditMode ? 'auto' : 'always';
    }

    constructor(
        private alertService: AlertService,
        private translationService: AppTranslationService,
        private accountService: AccountService,
        private formBuilder: FormBuilder,
        private maintenanceService: MaintenanceService
    ) {
        //this.buildForm();
    }

    ngOnChanges() {
        if (this.entity) {
            this.isNewEntity = false;
        }
        else {
            this.isNewEntity = true;
            this.entity = new AgeModifier();
            this.entity.enabled = true;
        }
        
        this.resetForm();
    }

    ngOnDestroy() {

    }

    public setEntity(entity: AgeModifier) {
        this.entity = entity;
        
        this.ngOnChanges();
    }

    //private buildForm() {
    //    this.entityForm = this.formBuilder.group({
    //        description: ['', Validators.required],
    //        isEnabled: ''
    //    });
    //}

    public resetForm(stopEditing: boolean = false) {
        if (stopEditing) {
            this.isEditMode = false;
        }

        if (!this.entity) {
            this.isNewEntity = true;
            this.entity = new AgeModifier();
        }

        this.entityForm.reset({
            description: this.entity.description || '',
            isEnabled: this.entity.enabled || false
        });
    }
    
    public beginEdit() {
        this.isEditMode = true;
    }

    public save() {
        if (!this.form.submitted) {
            // Causes validation to update.
          this.form.onSubmit(null as unknown as Event);
            return;
        }

        if (!this.entityForm.valid) {
            this.alertService.showValidationError();
            return;
        }

        this.isSaving = true;
        this.alertService.startLoadingMessage("Saving changes...");

        const editedEntity = this.getEditedEntity();

        if (this.isNewEntity) {
            this.maintenanceService.newAgeModifier(editedEntity).subscribe(
                entity => this.saveCompleted(entity),
                error => this.saveFailed(error));
        }
        else {
            this.maintenanceService.updateAgeModifier(editedEntity).subscribe(
                response => this.saveCompleted(editedEntity),
                error => this.saveFailed(error));
        }
    }

    public cancel() {
        this.resetForm();
        this.isEditMode = false;

        this.alertService.resetStickyMessage();
    }

    private getEditedEntity(): AgeModifierEdit {
        const formModel = this.entityForm.value;

        return {
            id: this.entity.id,
            description: formModel.description ?? '',
            enabled: formModel.isEnabled ?? false
        };
    }

    private saveCompleted(entity?: AgeModifier) {
        if (entity) {
            this.entity = entity;
        }

        this.isSaving = false;
        this.alertService.stopLoadingMessage();

        this.resetForm(true);

        this.onEntitySaved.next(this.entity);
    }

    private saveFailed(error: any) {
        this.isSaving = false;
        this.alertService.stopLoadingMessage();
        this.alertService.showStickyMessage("Save Error", "One or more errors occured whilst saving your changes:", MessageSeverity.error, error);
        this.alertService.showStickyMessage(error, null, MessageSeverity.error);
    }
}
