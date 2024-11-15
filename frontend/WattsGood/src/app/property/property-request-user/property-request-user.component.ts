import {Component, OnInit, ViewChild} from '@angular/core';
import {HouseholdCardComponent} from "../../household/household-card/household-card.component";
import {MapComponent} from "../../map/map.component";
import {MatLabel} from "@angular/material/form-field";
import {NgForOf} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import {MatPaginator} from "@angular/material/paginator";
import {
  MatCell, MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable,
  MatTableDataSource
} from "@angular/material/table";
import {MatButton} from "@angular/material/button";
import {City} from "../../model/City";
import {CityService} from "../../service/city.service";
import {Property} from "../../model/Property";
import {PropertyService} from "../../service/property.service";
import {MatSort, MatSortModule} from "@angular/material/sort";
import {BrowserAnimationsModule, NoopAnimationsModule} from "@angular/platform-browser/animations";

@Component({
  selector: 'app-property-request-user',
  standalone: true,
  imports: [
    HouseholdCardComponent,
    MapComponent,
    MatLabel,
    NgForOf,
    ReactiveFormsModule,
    MatTable,
    MatHeaderCell,
    MatCell,
    MatColumnDef,
    MatHeaderCellDef,
    MatCellDef,
    MatHeaderRowDef,
    MatRowDef,
    MatPaginator,
    MatHeaderRow,
    MatRow,
    MatButton,
    MatSortModule,
  ],
  templateUrl: './property-request-user.component.html',
  styleUrl: '../property-registration/property-registration.component.css'
})


export class PropertyRequestUserComponent implements OnInit{

  constructor(private cityService: CityService,private propertyService: PropertyService,) {
  }

  displayedColumns: string[] =['id','address', 'city', 'submissionDate', 'completionDate','requestStatus',];
  cities: City[] = [];
  dataSource: MatTableDataSource<Property> = new MatTableDataSource<Property>();
  @ViewChild(MatPaginator) paginator: any;
  @ViewChild(MatSort, {static: true}) sort: MatSort | undefined;
  properties: Property[] = [];

  ngOnInit(){
    this.loadCities();
    this.loadPropertyRequests();
    this.dataSource.sort = this.sort!;
  }

  loadPropertyRequests(): void {
    // this.propertyService.getAllPropertyRequestsByOwner().subscribe((data: Property[])
    this.propertyService.getAllPropertyRequests().subscribe((data: Property[]) => {
      this.dataSource.data = data;
      this.properties = data;
    });
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

  formatDate(dateArray: Date): string {

    if (Array.isArray(dateArray)) {
      const date = new Date(dateArray[0], dateArray[1] - 1, dateArray[2], dateArray[3], dateArray[4], dateArray[5], dateArray[6] / 1000);

      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear();
      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');
      const seconds = date.getSeconds().toString().padStart(2, '0');

      return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
    }
    else{
      return '/'
    }

  }


  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
  }

}

