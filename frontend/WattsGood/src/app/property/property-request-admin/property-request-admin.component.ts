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
import {MatSort, MatSortHeader} from "@angular/material/sort";
import {MatDialog} from "@angular/material/dialog";
import {PopupComponent} from "../../layout/popup/popup.component";
import {PropertyRequestComponent} from "../../dialog/property-request/property-request.component";

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
    MatButton,
    MatSort,
    MatSortHeader
  ],
  templateUrl: './property-request-admin.component.html',
  styleUrl: '../property-registration/property-registration.component.css'
})
export class PropertyRequestAdminComponent implements AfterViewInit{

  constructor(private propertyService: PropertyService,private dialog: MatDialog) {
  }

  displayedColumns: string[] =['id','address', 'city', 'submissionDate', 'floorNumber','requestStatus','actions'];
  dataSource: MatTableDataSource<Property> = new MatTableDataSource<Property>();
  @ViewChild(MatSort, {static: true}) sort: MatSort | undefined;
  properties: Property[] = [];
  currentPage: number = 0;
  pageSize: number = 5;
  totalItems!: number;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort!;
    this.loadPropertyRequests(this.currentPage, this.pageSize);
  }

  onPageChange(event: any): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadPropertyRequests(this.currentPage, this.pageSize);
  }

  loadPropertyRequests(page: number = 0, size: number = 5): void {
    this.propertyService.getPendingPropertyRequests(page, size).subscribe(response => {
      this.properties = response.content;
      this.totalItems = response.totalElements;
      this.dataSource.data = response.content;
    });
  }
  acceptRequest(id: number): void {
    this.propertyService.acceptPropertyRequest(id).subscribe(() => {
      this.showPopupSuccess('Successful',`Successfully accepted property request with id ${id}`)
      this.loadPropertyRequests();
    }, error => {
      alert('Failed to accept the request.');
    });
  }

  declineRequest(id: number): void {
    this.showPopup(id)
  }

  formatDate(dateArray: number[]): string {
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

  private showPopup(id:number){
    const dialog = this.dialog.open(PropertyRequestComponent, {
      width: '500px',
      data: { id: id }
    });
    dialog.afterClosed().subscribe(result => {
      if (result) {
        this.loadPropertyRequests();
        this.showPopupSuccess('Successful',`Successfully declined property request with id ${id}`)
      }
    });
  }

  private showPopupSuccess(tittle:string, message:string){
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
