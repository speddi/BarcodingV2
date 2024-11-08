import { NgModule } from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { TranslateModule } from '@ngx-translate/core';

import { BarcodingMaterialModule } from '../modules/material.module';

import { PageHeaderComponent } from './page-header/page-header.component';
import { UserEditorComponent } from '../admin/user-editor/user-editor.component';
import { AppDialogComponent } from './app-dialog/app-dialog.component';

import { GroupByPipe } from '../pipes/group-by.pipe';

@NgModule({
  imports: [
    DragDropModule,
    FormsModule, ReactiveFormsModule,
    BrowserModule, BrowserAnimationsModule,
    BarcodingMaterialModule,
    TranslateModule
  ],
  exports: [
    DragDropModule,
    FormsModule, ReactiveFormsModule,
    BrowserModule, BrowserAnimationsModule,
    BarcodingMaterialModule,
    TranslateModule,
    PageHeaderComponent,
    GroupByPipe,
    UserEditorComponent,
    AppDialogComponent
  ],
  declarations: [
    PageHeaderComponent,
    GroupByPipe,
    UserEditorComponent,
    AppDialogComponent
  ]
})
export class SharedModule {

}
