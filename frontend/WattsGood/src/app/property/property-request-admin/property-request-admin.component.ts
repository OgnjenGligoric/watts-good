import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow, MatRowDef, MatTable, MatTableDataSource
} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {DatePipe, NgForOf} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import {PropertyService} from "../../service/property.service";
import {City} from "../../model/City";
import {Property} from "../../model/Property";
import {CityService} from "../../service/city.service";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-property-request-admin',
  standalone: true,
  imports: [
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatPaginator,
    MatRow,
    MatRowDef,
    MatTable,
    NgForOf,
    ReactiveFormsModule,
    MatHeaderCellDef,
    DatePipe,
    MatButton
  ],
  templateUrl: './property-request-admin.component.html',
  styleUrl: '../property-registration/property-registration.component.css'
})
export class PropertyRequestAdminComponent implements AfterViewInit{

  constructor(private propertyService: PropertyService) {
  }

  displayedColumns: string[] =['id','address', 'city', 'submissionDate', 'floorNumber','requestStatus','actions'];
  dataSource: MatTableDataSource<Property> = new MatTableDataSource<Property>();
  @ViewChild(MatPaginator) paginator: any;
  properties: Property[] = [];

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }


  ngOnInit(){
    this.propertyService.getPendingPropertyRequests().subscribe(
      (data: Property[]) => {
        this.properties = data;
        this.dataSource.data = data;
      },
      error => {
        console.error('Error fetching properties:', error);
      }
    );
  }

  formatDate(date: Date): string {

    if (Array.isArray(date)) {
      date = new Date(date[0], date[1] - 1, date[2]);
    }
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;

  }


}
