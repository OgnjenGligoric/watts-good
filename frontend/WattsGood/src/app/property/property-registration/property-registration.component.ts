import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router} from "express";
import {MapComponent} from "../../map/map.component";
import {MatSelectModule} from "@angular/material/select";
import {CityService} from "../../service/city.service";
import {City} from "../../model/City";
import {CommonModule} from "@angular/common";
import {MatDialog} from "@angular/material/dialog";
import {HouseholdCardComponent} from "../../household/household-card/household-card.component";
import {Household} from "../../model/Household";

@Component({
  selector: 'app-property-registration',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MapComponent,
    MatSelectModule,
    CommonModule,
    HouseholdCardComponent
  ],
  templateUrl: './property-registration.component.html',
  styleUrl: './property-registration.component.css'
})
export class PropertyRegistrationComponent{

  constructor(private cityService: CityService, private dialog: MatDialog) {
  }
  cities: City[] = [];
  latitude: number | null = null;
  longitude: number | null = null;
  uploadedPictures: File[] = [];
  households: Household[] = [];

  propertyRegistrationForm = new FormGroup({
    address: new FormControl('', ),
    floorNumber: new FormControl('', ),
    location: new FormControl(''),
    images: new FormControl(''),
    pdf: new FormControl(''),
  });

  householdForm = new FormGroup({
    floorNumber: new FormControl('', Validators.required),
    apartmentNumber: new FormControl('', Validators.required),
    squaredMeters: new FormControl('', Validators.required),
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

  addHouseholdCard(): void {
    const floorNumber = this.householdForm.get('floorNumber')?.value;
    const apartmentNumber = this.householdForm.get('apartmentNumber')?.value;
    const squaredMeters = this.householdForm.get('squaredMeters')?.value;

    const household: Household = {
      floorNumber: floorNumber ? parseInt(floorNumber, 10) : 0,
      apartmentNumber: apartmentNumber ? parseInt(apartmentNumber, 10) : 0,
      squaredMeters: squaredMeters ? parseFloat(squaredMeters) : 0
    };
    this.households.push(household);
    this.householdForm.reset();
  }


  updateCoordinates(event: { lat: number, lng: number, address: string }): void {
    this.latitude = event.lat;
    this.longitude = event.lng;
    this.propertyRegistrationForm.patchValue({
      location: `${this.latitude.toFixed(10)},${this.longitude.toFixed(10)}`,
      address: event.address
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

  removeHouseholdCard(index: number): void {
    this.households.splice(index, 1);
  }


  onSubmit() {
    if (this.propertyRegistrationForm.valid) {
      console.log(this.propertyRegistrationForm.value);
    } else {
      console.log('Form is not valid');
    }
  }
}
