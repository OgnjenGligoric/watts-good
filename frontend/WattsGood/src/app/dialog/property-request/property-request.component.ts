import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatFormField} from "@angular/material/form-field";
import {FormsModule} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";
import {PropertyService} from "../../service/property.service";
import {Property} from "../../model/Property";

@Component({
  selector: 'app-property-request',
  standalone: true,
  imports: [
    MatFormField,
    FormsModule,
    MatButton,
    MatInput
  ],
  templateUrl: './property-request.component.html',
  styleUrl: './property-request.component.css'
})
export class PropertyRequestComponent {
  public inputText: string = '';

  constructor(private dialogRef: MatDialogRef<PropertyRequestComponent>,
              @Inject(MAT_DIALOG_DATA) public data: {id: number},
              private propertyService: PropertyService) {
  }

  submit() {
    this.propertyService.declinePropertyRequest(this.data.id, this.inputText).subscribe(
      (response: Property) => {
        this.dialogRef.close(response);
      },
      (error) => {
        console.error('Error declining property:', error);
      }
    );
  }

  close() {
    this.dialogRef.close();
  }
}
