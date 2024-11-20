import {JsonPipe} from '@angular/common';
import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ActivatedRoute } from '@angular/router';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from '@danielmoncada/angular-datetime-picker';
import {MatButtonModule} from '@angular/material/button';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';



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
    MatButtonModule,
    CanvasJSAngularChartsModule],
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
  BarChartOptions = {
		title: {
			text: "Activity by the Time Unit"
		},
		animationEnabled: true,
		axisY: {
			includeZero: true
		},
		data: [{
			type: "column", //change type to bar, line, area, pie, etc
			//indexLabel: "{y}", //Shows y value on all Data Points
			indexLabelFontColor: "#5A5757",
			dataPoints: [
				{ x: 10, y: 71 },
				{ x: 20, y: 55 },
				{ x: 30, y: 50 },
				{ x: 40, y: 65 },
				{ x: 50, y: 71 },
				{ x: 60, y: 92, indexLabel: "Highest\u2191" },
				{ x: 70, y: 68 },
				{ x: 80, y: 38, indexLabel: "Lowest\u2193"  },
				{ x: 90, y: 54 },
				{ x: 100, y: 60 }
			]
		}]
	}
  pieChartOptions = {
	  animationEnabled: true,
	  theme: "white",
	  exportEnabled: true,
	  title: {
		  text: "Activity Percentage"
	  },
	  subtitles: [{
		  text: "Median hours/week"
	  }],
	  data: [{
		  type: "pie", //change type to column, line, area, doughnut, etc
		  indexLabel: "{name}: {y}%",
		  dataPoints: [
		  	{ name: "Active", y: 30 },
		  	{ name: "Inactive", y: 70 },
		  ]
	  }]
	}


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
