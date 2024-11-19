import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgModule } from '@angular/core';
import {ChangeDetectionStrategy} from '@angular/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {DateAdapter, MAT_DATE_FORMATS, MAT_NATIVE_DATE_FORMATS, NativeDateAdapter, provideNativeDateAdapter} from '@angular/material/core';

@Component({
  selector: 'app-household-details',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatDatepickerModule
  ],
  providers: [{provide: DateAdapter, useClass: NativeDateAdapter}, {provide: MAT_DATE_FORMATS, useValue: MAT_NATIVE_DATE_FORMATS},],
  templateUrl: './household-details.component.html',
  styleUrl: './household-details.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class HouseholdDetailsComponent {
  householdId: number | null = null;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.householdId = Number(this.route.snapshot.paramMap.get('id'));
  }
}
