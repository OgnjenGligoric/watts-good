import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-popup',
  standalone: true,
  imports: [
    MatButton
  ],
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.css'
})
export class PopupComponent {
  constructor(private dialogRef: MatDialogRef<PopupComponent>,
              @Inject(MAT_DIALOG_DATA) public data: { title: string; message: string }) {
  }

  close() {
    this.dialogRef.close();
  }
}
