import { Component, OnInit } from '@angular/core';
import { HouseholdService } from '../../service/household.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-household-search',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './household-search.component.html',
  styleUrls: ['./household-search.component.css']
})
export class HouseholdSearchComponent implements OnInit {

  constructor(private client: HouseholdService) {}

  ngOnInit(): void {
    this.client.getAllHouseholds().subscribe(
      (data) => {
        console.log(data); // Replace with real handling of data
      },
      (error) => {
        console.error('Error fetching households', error);
      }
    );
  }
}
