import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerServicioClienteComponent } from './ver-servicio-cliente.component';

describe('VerServicioClienteComponent', () => {
  let component: VerServicioClienteComponent;
  let fixture: ComponentFixture<VerServicioClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerServicioClienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerServicioClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
