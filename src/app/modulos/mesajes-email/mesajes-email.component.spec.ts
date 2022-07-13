import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesajesEmailComponent } from './mesajes-email.component';

describe('MesajesEmailComponent', () => {
  let component: MesajesEmailComponent;
  let fixture: ComponentFixture<MesajesEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MesajesEmailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MesajesEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
