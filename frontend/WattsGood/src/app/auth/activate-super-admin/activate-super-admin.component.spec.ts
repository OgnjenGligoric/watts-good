import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivateSuperAdminComponent } from './activate-super-admin.component';

describe('ActivateSuperAdminComponent', () => {
  let component: ActivateSuperAdminComponent;
  let fixture: ComponentFixture<ActivateSuperAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActivateSuperAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivateSuperAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
