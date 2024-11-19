import { Component, OnInit } from '@angular/core';
import { HouseholdService } from '../../service/household.service';
import { HttpClientModule } from '@angular/common/http';
import { AnyARecord } from 'node:dns';
import { HouseholdGetAllDTO } from '../../model/dto/HouseholdGetAllDTO';
import { MatCardModule } from '@angular/material/card'; // Import Angular Material Card module
import { NgFor, NgClass } from '@angular/common'; // Import common directives like *ngFor and [ngClass]
import { RouterModule, Routes } from '@angular/router';

@Component({
  selector: 'app-household-search',
  standalone: true,
  imports: [HttpClientModule,
    MatCardModule,
    NgFor,NgClass, RouterModule],
  templateUrl: './household-search.component.html',
  styleUrls: ['./household-search.component.css']
})
export class HouseholdSearchComponent implements OnInit {

  households : HouseholdGetAllDTO[] = [];
  constructor(private client: HouseholdService) {}

  ngOnInit(): void {
    this.client.getAllHouseholds().subscribe(
      (data : any) => {
        console.log(data);
        this.households = data; // Replace with real handling of data
      },
      (error : any) => {
        console.error('Error fetching households', error);
      }
    );
  }
}
