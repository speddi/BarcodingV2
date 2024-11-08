import { Injectable } from '@angular/core';

import { AppTheme } from '../../models/AppTheme';

@Injectable()
export class ThemeManager {
  themes: Array<AppTheme> = [
    {
      id: 1,
      name: 'indigo-pink',
      displayName: 'Indigo & Pink',
      primary: '#3F51B5',
      accent: '#E91E63',
      isDark: false,
      isDefault: true,
    },
    {
      id: 2,
      name: 'deeppurple-amber',
      displayName: 'Purple & Amber',
      primary: '#673AB7',
      accent: '#FFC107',
      isDark: false,
    },
    {
      id: 3,
      name: 'pink-bluegrey',
      displayName: 'Pink & Blue',
      primary: '#E91E63',
      accent: '#607D8B',
      isDark: true,
    },
    {
      id: 4,
      name: 'purple-green',
      displayName: 'Purple & Green',
      primary: '#9C27B0',
      accent: '#4CAF50',
      isDark: true,
    },
  ];

  public installTheme(theme: AppTheme) {
    if (theme == null || theme.isDefault) {
      this.removeStyle('theme');
    } else {
      this.setStyle('theme', `${theme.name}.css`);
    }
  }

  public getThemeByID(id: number): AppTheme {
    const theme = this.themes.find(theme => theme.id === id);

    if (!theme)
      throw new Error(`Theme with id "${id}" not found!`);

    return theme;
  }

  private setStyle(key: string, href: string) {
    this.getLinkElementForKey(key).setAttribute('href', href);
  }

  private removeStyle(key: string) {
    const existingLinkElement = this.getExistingLinkElementByKey(key);
    if (existingLinkElement) {
      document.head.removeChild(existingLinkElement);
    }
  }

  private getLinkElementForKey(key: string) {
    return this.getExistingLinkElementByKey(key) || this.createLinkElementWithKey(key);
  }

  private getExistingLinkElementByKey(key: string) {
    return document.head.querySelector(`link[rel="stylesheet"].${this.getClassNameForKey(key)}`);
  }

  private createLinkElementWithKey(key: string) {
    const linkEl = document.createElement('link');
    linkEl.setAttribute('rel', 'stylesheet');
    linkEl.classList.add(this.getClassNameForKey(key));
    document.head.appendChild(linkEl);
    return linkEl;
  }

  private getClassNameForKey(key: string) {
    return `style-manager-${key}`;
  }
}
