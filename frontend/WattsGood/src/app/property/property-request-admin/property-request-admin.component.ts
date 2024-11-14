import {Component, ViewChild} from '@angular/core';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow, MatRowDef, MatTable
} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {NgForOf} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";

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
    MatHeaderCellDef
  ],
  templateUrl: './property-request-admin.component.html',
  styleUrl: '../property-registration/property-registration.component.css'
})
export class PropertyRequestAdminComponent {

  displayedColumns: string[] =['id','address', 'city', 'submissionDate', 'completionDate','requestStatus',];
  // dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator: any;

}
