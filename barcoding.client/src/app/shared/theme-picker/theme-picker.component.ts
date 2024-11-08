import { Component, ViewEncapsulation, ChangeDetectionStrategy, NgModule, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';

import { ThemeManager } from './theme-manager';
import { AppTheme } from '../../models/AppTheme';
import { ConfigurationService } from '../../services/configuration.service';

@Component({
  selector: 'app-theme-picker',
  templateUrl: 'theme-picker.component.html',
  styleUrl: 'theme-picker.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class ThemePickerComponent {
  @Input() tooltip = 'Theme';

  constructor(
    public themeManager: ThemeManager,
    private configuration: ConfigurationService
  ) {
    configuration.configurationImported$.subscribe(() => this.setTheme(this.currentTheme));
    this.setTheme(this.currentTheme);
  }

  get currentTheme(): AppTheme {
    return this.themeManager.getThemeByID(this.configuration.themeId);
  }

  setTheme(theme: AppTheme) {
    if (theme) {
      this.themeManager.installTheme(theme);
      this.configuration.themeId = theme.id;
    }
  }
}

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatListModule,
    MatTooltipModule,
  ],
  exports: [ThemePickerComponent],
  declarations: [ThemePickerComponent],
  providers: [ThemeManager, ConfigurationService],
})
export class ThemePickerModule { }
