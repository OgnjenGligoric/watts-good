import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router} from "express";
import {MapComponent} from "../../map/map.component";

@Component({
  selector: 'app-property-registration',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MapComponent,
  ],
  templateUrl: './property-registration.component.html',
  styleUrl: './property-registration.component.css'
})
export class PropertyRegistrationComponent {
  constructor() {
  }

  propertyRegistrationForm = new FormGroup({
    address: new FormControl('', [Validators.required]),
    floorNumber: new FormControl('', [Validators.required]),
  });

  onSubmit() {
    if (this.propertyRegistrationForm.valid) {
      console.log(this.propertyRegistrationForm.value);
    } else {
      console.log('Form is not valid');
    }
  }


}
