import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatLabel} from "@angular/material/form-field";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-household-card',
  standalone: true,
  imports: [
    MatLabel,
    ReactiveFormsModule
  ],
  templateUrl: './household-card.component.html',
  styleUrl: './household-card.component.css'
})
export class HouseholdCardComponent {

  @Input() floorNumber: number | null = null;
  @Input() apartmentNumber: number | null = null;
  @Input() squaredMeters: number | null = null;
  @Output() remove: EventEmitter<void> = new EventEmitter();

  householdForm: FormGroup;

  constructor() {
    this.householdForm = new FormGroup({
      floorNumber: new FormControl(null),
      apartmentNumber: new FormControl(null),
      squaredMeters: new FormControl(null)
    });
  }

  ngOnInit(): void {
    this.householdForm = new FormGroup({
      floorNumber: new FormControl(this.floorNumber),
      apartmentNumber: new FormControl(this.apartmentNumber),
      squaredMeters: new FormControl(this.squaredMeters)
    });
  }

  onRemove(): void {
    this.remove.emit();
  }
}
