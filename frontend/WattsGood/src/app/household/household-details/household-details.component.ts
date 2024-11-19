import {JsonPipe} from '@angular/common';
import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ActivatedRoute } from '@angular/router';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from '@danielmoncada/angular-datetime-picker';
import {MatButtonModule} from '@angular/material/button';


@Component({
  selector: 'app-household-details',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    MatButtonModule],
  providers: [provideNativeDateAdapter()],
  templateUrl: './household-details.component.html',
  styleUrl: './household-details.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class HouseholdDetailsComponent {
  householdId: number | null = null;
  exceedesOneYearDifference: boolean = false;
  public selectedMoments = [
    new Date(),
    new Date()
  ];
  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.householdId = Number(this.route.snapshot.paramMap.get('id'));
  }

  validateDateRange(): void {
    if (this.selectedMoments.length === 2) {
      const [startDate, endDate] = this.selectedMoments;
      if (startDate && endDate) {
        const differenceInYears = Math.abs(endDate.getFullYear() - startDate.getFullYear());
        const sameYearButExceeds = differenceInYears === 0 && endDate > new Date(startDate.getTime() + 365 * 24 * 60 * 60 * 1000);
        this.exceedesOneYearDifference = differenceInYears > 1 || sameYearButExceeds;
      } 
    }
  }
}
