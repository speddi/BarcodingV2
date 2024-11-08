import { Component, OnInit, AfterViewInit, TemplateRef, ViewChild, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { fadeInOut } from '../../../services/animations';
import { AlertService, DialogType, MessageSeverity } from '../../../services/alert.service';
import { AppTranslationService } from "../../../services/app-translation.service";
import { AccountService } from "../../../services/account.service";
import { MaintenanceService } from "../../../services/maintenance.service";
import { Utilities } from "../../../services/utilities";
import { AgeModifier } from '../../../models/maintenance/agemodifier.model';
import { Permission } from '../../../models/permission.model';
import { EditAgeModifierDialogComponent } from './edit-agemodifier-dialog.component';

@Component({
    selector: 'app-agemodifier-list',
    templateUrl: './agemodifier-list.component.html',
    styleUrls: ['./agemodifier-list.component.scss'],
    animations: [fadeInOut]
})
export class AgeModifierListComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;

  @ViewChild(MatSort, { static: true })
  sort!: MatSort;

    displayedColumns = ['description', 'enabled', 'actions'];
    dataSource: MatTableDataSource<AgeModifier>;
    sourceEntity: AgeModifier | null = null;
    loadingIndicator = false;
    
    constructor(
        private alertService: AlertService,
        private translationService: AppTranslationService,
        private accountService: AccountService,
        private snackBar: MatSnackBar,
        private dialog: MatDialog,
        private maintenanceService: MaintenanceService) {

        // Assign the data to the data source for the table to render
        this.dataSource = new MatTableDataSource();
    }

    ngOnInit() {
        this.loadData();
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    public applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue;
    }

    private refresh() {
        // Causes the filter to refresh there by updating with recently added data.
        this.applyFilter(this.dataSource.filter);
    }

    private updateEntities(entity: AgeModifier) {
        if (this.sourceEntity) {
            this.maintenanceService.getAgeModifier(this.sourceEntity.id).subscribe(
                entity => {
                    Object.assign(this.sourceEntity || {}, entity)
                    this.alertService.showMessage("Success", `Changes to AgeModifier \"${entity.description}\" was saved successfully`, MessageSeverity.success);
                    this.sourceEntity = null;
                });
        }
        else {
            this.dataSource.data.push(entity);
            this.refresh();
            this.alertService.showMessage("Success", `AgeModifier \"${entity.description}\" was created successfully`, MessageSeverity.success);
        }
    }

    private loadData() {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;

        this.maintenanceService.getAgeModifiers().subscribe(
            entities => this.onDataLoadSuccessful(entities),
            error => this.onDataLoadFailed(error)
        );
    }

    private onDataLoadSuccessful(entities: AgeModifier[]) {
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        this.dataSource.data = entities;
    }

    private onDataLoadFailed(error: any) {
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;

        this.alertService.showStickyMessage("Load Error", `Unable to retrieve agemodifiers from the server.\r\nErrors: "${Utilities.getHttpResponseMessage(error)}"`,
            MessageSeverity.error, error);
    }

    public edit(entity?: AgeModifier) {
        this.sourceEntity = entity ?? null;

        let dialogRef = this.dialog.open(EditAgeModifierDialogComponent,
            {
                panelClass: 'mat-dialog-lg',
                data: { entity: entity }
            });
        dialogRef.afterClosed().subscribe(entity => {
            if (entity) {
                this.updateEntities(entity);
            }
        });
    }
}
