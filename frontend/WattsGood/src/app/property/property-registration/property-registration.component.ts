import {Component, OnInit} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  ɵCoerceStrArrToNumArr, ɵFormGroupRawValue, ɵNavigate, ɵTypedOrUntyped
} from "@angular/forms";
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
  uploadedPdfs: File[] = [];
  households: Household[] = [];

  propertyRegistrationForm = new FormGroup({
    address: new FormControl('', [Validators.required]),
    floorNumber: new FormControl('',[Validators.required] ),
    location: new FormControl('',[Validators.required]),
    images: new FormControl('',[Validators.required]),
    pdf: new FormControl('',[Validators.required]),
  });

  householdForm = new FormGroup({
    floorNumber: new FormControl('', [Validators.required, Validators.min(0)]),
    apartmentNumber: new FormControl('', [Validators.required, Validators.min(0)]),
    squaredMeters: new FormControl('', [Validators.required, Validators.min(0)])
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

    if (
      this.householdForm.valid &&
      this.isUniqueApartmentNumber(household.apartmentNumber) &&
      this.isValidSquaredMeters(household.squaredMeters) &&
      this.isValidFloorNumber(household.floorNumber)
    ) {
      this.households.push(household);
      this.householdForm.reset();
    }else{
      alert("Please insert valid values into household form! ")
    }
  }


  updateCoordinates(event: { lat: number, lng: number, address: string }): void {
    this.latitude = event.lat;
    this.longitude = event.lng;
    this.propertyRegistrationForm.patchValue({
      location: `${this.latitude.toFixed(10)},${this.longitude.toFixed(10)}`,
      address: event.address
    });
  }

  imageChanged($event: Event) {
    const files: FileList | null = ($event.target as HTMLInputElement).files;
    if (files) {
      for (let i = 0; i < files.length; i++) {
        this.uploadedPictures.push(files[i]);
      }
    }
  }

  pdfChanged($event: Event) {
    const files: FileList | null = ($event.target as HTMLInputElement).files;
    if (files) {
      for (let i = 0; i < files.length; i++) {
        this.uploadedPdfs.push(files[i]);
      }
    }
  }

  private isUniqueApartmentNumber(apartmentNumber: number | null): boolean {
    if (apartmentNumber !== null && this.households.some(h => h.apartmentNumber === apartmentNumber)) {
      return false;
    }
    return true;
  }

  private isValidSquaredMeters(squaredMeters: number | null): boolean {
    if (squaredMeters === null || squaredMeters <= 0) {
      return false;
    }
    return true;
  }

  private isValidFloorNumber(floorNumber: number | null): boolean {
    const maxFloors = this.propertyRegistrationForm.get('floorNumber')?.value;
    const maxFloorsNumber = maxFloors ? parseInt(maxFloors, 10) : 1;

    if (floorNumber !== null && maxFloorsNumber !== undefined && floorNumber > maxFloorsNumber) {
      return false;
    }
    return true;
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
