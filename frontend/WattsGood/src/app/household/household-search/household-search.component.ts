import { Component, OnInit } from '@angular/core';
import { HouseholdService } from '../../service/household.service';
import { HttpClientModule } from '@angular/common/http';
import { HouseholdGetAllDTO } from '../../model/dto/HouseholdGetAllDTO';
import { MatCardModule } from '@angular/material/card'; // Import Angular Material Card module
import { NgFor, NgClass, NgIf } from '@angular/common'; // Import common directives like *ngFor and [ngClass]
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';  // Import this module
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button'; // Import MatButtonModule

@Component({
  selector: 'app-household-search',
  standalone: true,
  imports: [HttpClientModule,
    MatCardModule,
    NgFor,NgClass, NgIf,
    RouterModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule],
  templateUrl: './household-search.component.html',
  styleUrls: ['./household-search.component.css']
})
export class HouseholdSearchComponent implements OnInit {

  households : HouseholdGetAllDTO[] = [];
  form!: FormGroup;
  constructor(private fb: FormBuilder, private client: HouseholdService) {}


  createForm(): void {
    
  }


  onSubmit(): void {
    if (this.form && this.form.valid) {
      console.log(this.form.value);
    } else {
      console.log('Form is invalid');
    }
  }

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
    this.form = this.fb.group({
      city: ['', Validators.required],  // 'city' is required
      squareMeters: ['', [Validators.required, Validators.min(1)]],  // squareMeters must be > 0
      floorNumber: ['', [Validators.required, Validators.min(0)]],  // floorNumber must be >= 0
    });  }
}
