import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router} from "express";
import {MapComponent} from "../../map/map.component";
import {MatSelectModule} from "@angular/material/select";
import {CityService} from "../../service/city.service";
import {City} from "../../model/City";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-property-registration',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MapComponent,
    MatSelectModule,
    CommonModule
  ],
  templateUrl: './property-registration.component.html',
  styleUrl: './property-registration.component.css'
})
export class PropertyRegistrationComponent{

  constructor(private cityService: CityService) {
  }
  cities: City[] = [];
  latitude: number | null = null;
  longitude: number | null = null;
  uploadedPictures: File[] = [];

  propertyRegistrationForm = new FormGroup({
    address: new FormControl('', [Validators.required]),
    floorNumber: new FormControl('', [Validators.required]),
    location: new FormControl(''),
    images: new FormControl(''),
    pdf: new FormControl(''),
  });

  ngOnInit(){
    this.loadCities();
  }

  loadCities(){
    this.cityService.getAll().subscribe(
      (data: City[]) => {
        this.cities = data;
      },
      error => {
        console.error('Error fetching cities:', error);
      }
    );
  }

  updateCoordinates(event: { lat: number, lng: number }): void {
    this.latitude = event.lat;
    this.longitude = event.lng;

    this.propertyRegistrationForm.patchValue({
      location: `${this.latitude.toFixed(10)},${this.longitude.toFixed(10)}`,
    });
  }

  choosenImageChanged($event: Event) {
    const files: FileList | null = ($event.target as HTMLInputElement).files;
    if (files) {
      for (let i = 0; i < files.length; i++) {
        this.uploadedPictures.push(files[i]);
        console.log(files[i]);
      }
    }
  }


  onSubmit() {
    if (this.propertyRegistrationForm.valid) {
      console.log(this.propertyRegistrationForm.value);
    } else {
      console.log('Form is not valid');
    }
  }
}
