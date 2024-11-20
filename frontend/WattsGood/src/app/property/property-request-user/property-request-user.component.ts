import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {HouseholdCardComponent} from "../../household/household-card/household-card.component";
import {MapComponent} from "../../map/map.component";
import {MatLabel} from "@angular/material/form-field";
import {NgForOf} from "@angular/common";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
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
import {MatSort, MatSortModule, Sort} from "@angular/material/sort";
import {BrowserAnimationsModule, NoopAnimationsModule} from "@angular/platform-browser/animations";
import {AuthService} from "../../service/auth.service";

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


export class PropertyRequestUserComponent implements AfterViewInit{

  constructor(private cityService: CityService,private propertyService: PropertyService, private authService: AuthService) {
  }
  currentFilters: { city?: string; address?: string; requestStatus?: string; search?: string; sortColumn?: string; sortDirection?: string } = {};
  displayedColumns: string[] =['id','address', 'city', 'submissionDate', 'completionDate','requestStatus',];
  cities: City[] = [];
  dataSource: MatTableDataSource<Property> = new MatTableDataSource<Property>();
  @ViewChild(MatSort, {static: true}) sort: MatSort | undefined;
  properties: Property[] = [];
  currentPage: number = 0;
  pageSize: number = 5;
  totalItems!: number;
  sortColumn: string = 'id';
  sortDirection: string = 'asc';


  filterForm = new FormGroup<any>({
    requestStatus: new FormControl("",),
    city: new FormControl("",),
    address: new FormControl('',),
    search: new FormControl('',),
  });


  ngAfterViewInit() {
    this.loadCities();
    this.dataSource.sort = this.sort!;
    this.loadUserPropertyRequests(this.authService.getEmail()!, this.currentPage, this.pageSize);
  }


  onSubmitFilters(): void {
    const filters = this.filterForm.value;
    this.currentFilters = {
      city: filters.city,
      address: filters.address,
      requestStatus: filters.requestStatus,
      search: filters.search,
      sortColumn: this.sortColumn,
      sortDirection: this.sortDirection,
    };

    this.loadUserPropertyRequestsWithFilters(this.authService.getEmail()!, this.currentPage, this.pageSize, this.currentFilters);
  }


  onSortChange(event: Sort): void {
    this.sortColumn = event.active;
    this.sortDirection = event.direction;

    this.currentFilters = {
      ...this.currentFilters,
      sortColumn: this.sortColumn,
      sortDirection: this.sortDirection,
    };

    this.loadUserPropertyRequestsWithFilters(this.authService.getEmail()!, this.currentPage, this.pageSize, this.currentFilters);
  }


  onPageChange(event: any): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadUserPropertyRequestsWithFilters(this.authService.getEmail()!, this.currentPage, this.pageSize,this.currentFilters);
  }

  loadUserPropertyRequests(ownerEmail: string, page: number = 0, size: number = 5): void {
    this.propertyService.getPaginatedPropertiesByOwner(ownerEmail,page, size).subscribe(response => {
      this.properties = response.content;
      this.totalItems = response.totalElements;
      this.dataSource.data = response.content;
    });
  }

  loadUserPropertyRequestsWithFilters(
    ownerEmail: string, page: number = 0, size: number = 5,
    filters: { city?: string; address?: string; requestStatus?: string; search?: string; sortColumn?: string; sortDirection?: string } = {}
  ): void {
    const sortParams = {
      ...filters,
      sortColumn: this.sortColumn,
      sortDirection: this.sortDirection
    };

    this.propertyService
      .getPaginatedPropertiesByOwnerWithFilter(ownerEmail, page, size, sortParams)
      .subscribe(response => {
        this.properties = response.content;
        this.totalItems = response.totalElements;
        this.dataSource.data = response.content;
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
}

