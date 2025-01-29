import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';

export interface DialogData {
  title: string; // Title of the dialog
  confirmText?: string; // Text for the confirm button
  cancelText?: string; // Text for the cancel button
  disableClose?: boolean; // Whether to disable close on backdrop click
  component?: any; // Optional component to render dynamically
}

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  standalone: true, // Ensures the component works as a standalone module
  imports: [MatDialogModule, CommonModule],
})
export class DialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  /**
   * Handles closing the dialog.
   * @param result - Boolean value indicating if the action was confirmed or canceled.
   */
  onClose(result: boolean): void {
    this.dialogRef.close(result);
  }
}
