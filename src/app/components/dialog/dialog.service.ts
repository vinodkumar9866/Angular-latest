import { Injectable, Type } from '@angular/core';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
} from '@angular/material/dialog';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(private dialog: MatDialog) {}

  /**
   * Opens a dialog dynamically with a given component and configuration.
   *
   * @param component - The component to render inside the dialog.
   * @param config - Optional dialog configuration (height, width, data, etc.).
   * @returns - The MatDialogRef instance for further operations.
   */
  openDialog<T, D = any>(
    component: Type<T>,
    config?: MatDialogConfig<D>
  ): MatDialogRef<T> {
    const defaultConfig: MatDialogConfig = {
      width: '500px', // Default width
      autoFocus: true, // Default focus behavior
      disableClose: false, // Allow closing by clicking outside
      panelClass: 'custom-dialog', // Default panel class for styling
      ...config, // Spread additional options passed in the config
    };

    return this.dialog.open(component, defaultConfig);
  }
}
