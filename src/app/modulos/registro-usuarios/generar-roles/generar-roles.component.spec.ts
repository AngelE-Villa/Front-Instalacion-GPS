import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerarRolesComponent } from './generar-roles.component';

describe('GenerarRolesComponent', () => {
  let component: GenerarRolesComponent;
  let fixture: ComponentFixture<GenerarRolesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenerarRolesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerarRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
