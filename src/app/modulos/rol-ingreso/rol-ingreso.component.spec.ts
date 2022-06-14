import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RolIngresoComponent } from './rol-ingreso.component';

describe('RolIngresoComponent', () => {
  let component: RolIngresoComponent;
  let fixture: ComponentFixture<RolIngresoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RolIngresoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RolIngresoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
