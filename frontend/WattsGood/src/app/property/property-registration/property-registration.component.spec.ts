import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyRegistrationComponent } from './property-registration.component';

describe('PropertyRegistrationComponent', () => {
  let component: PropertyRegistrationComponent;
  let fixture: ComponentFixture<PropertyRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PropertyRegistrationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PropertyRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
