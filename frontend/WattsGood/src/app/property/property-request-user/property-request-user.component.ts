import {Component, ViewChild} from '@angular/core';
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
    MatButton
  ],
  templateUrl: './property-request-user.component.html',
  styleUrl: '../property-registration/property-registration.component.css'
})


export class PropertyRequestUserComponent {

  constructor(private cityService: CityService) {
  }

  displayedColumns: string[] =['id','address', 'city', 'submissionDate', 'completionDate','requestStatus',];
  cities: City[] = [];
  // dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: any;

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

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
  }

}

