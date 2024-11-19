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
import {Property} from "../../model/Property";
import {Location} from "../../model/Location";
import {PropertyRequest} from "../../model/PropertyRequest";
import {PropertyService} from "../../service/property.service";
import {PopupComponent} from "../../layout/popup/popup.component";



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

  constructor(private cityService: CityService, private propertyService: PropertyService,private dialog: MatDialog) {
  }
  cities: City[] = [];
  latitude: number = 0;
  longitude: number = 0;
  uploadedPictures: File[] = [];
  uploadedPdfs: File[] = [];
  households: Household[] = [];

  propertyRegistrationForm = new FormGroup<any>({
    address: new FormControl("",[Validators.required]),
    floorNumber: new FormControl(0,[Validators.required] ),
    location: new FormControl('',[Validators.required]),
    city: new FormControl('',[Validators.required]),
    images: new FormControl('',[Validators.required]),
    pdf: new FormControl('',[Validators.required]),
  });

  householdForm = new FormGroup({
    floorNumber: new FormControl(0, [Validators.required]),
    apartmentNumber: new FormControl(0, [Validators.required]),
    squareMeters: new FormControl(0, [Validators.required])
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
    const household: Household = {
      floorNumber: this.householdForm.get('floorNumber')?.value!,
      apartmentNumber: this.householdForm.get('apartmentNumber')?.value!,
      squareMeters: this.householdForm.get('squareMeters')?.value!
    };

    if (
      this.householdForm.valid &&
      this.isUniqueApartmentNumber(household.apartmentNumber) &&
      this.isValidSquaredMeters(household.squareMeters) &&
      this.isValidFloorNumber(household.floorNumber)
    ) {
      this.households.push(household);
      this.householdForm.reset();
    }else{
      this.showPopup('Invalid household form','Please insert valid values into household form!')
    }
  }

  onSubmitProperty() {
    if (this.propertyRegistrationForm.valid &&
      this.uploadedPictures.length != 0 &&
      this.uploadedPdfs.length != 0 &&
      this.households.length != 0) {
      const propertyLocation: Location = {
        latitude: this.latitude,
        longitude: this.longitude
      };

      const property: Property = {
        owner: null,
        address:  this.propertyRegistrationForm.get('address')?.value,
        location: propertyLocation,
        city: this.cities.find(city => city.id == this.propertyRegistrationForm.value.city)!,
        households: this.households,
        numberOfFloors: this.propertyRegistrationForm.value.floorNumber,
        requestStatus: PropertyRequest.Pending,
        submissionDate: new Date(),
        completionDate: null,
      };

      this.propertyService.createProperty(property,this.uploadedPictures,this.uploadedPdfs).subscribe(
        (response) => {
          this.showPopup('Successfull','Successfully created property!')
          this.clearForms();
        }
      );
    }else{
      this.showPopup('Invalid property form','Please fill out the form correctly')
    }
  }

  clearForms(){
    this.households = [];
    this.uploadedPdfs = [];
    this.uploadedPictures =[];
    this.propertyRegistrationForm.reset();
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
    return !(squaredMeters === null || squaredMeters <= 0);

  }

  private isValidFloorNumber(floorNumber: number | null): boolean {
    const maxFloors = this.propertyRegistrationForm.get('floorNumber')?.value;
    const maxFloorsNumber = maxFloors ? parseInt(String(maxFloors), 10) : 1;

    return !(floorNumber !== null && maxFloorsNumber !== undefined && floorNumber > maxFloorsNumber);

  }

  removeHouseholdCard(index: number): void {
    this.households.splice(index, 1);
  }

  private showPopup(tittle:string, message:string){
    this.dialog.open(PopupComponent, {
      width: '300px',
      disableClose: true,
      data: {
        title: tittle,
        message: message
      }
    });
  }

}
