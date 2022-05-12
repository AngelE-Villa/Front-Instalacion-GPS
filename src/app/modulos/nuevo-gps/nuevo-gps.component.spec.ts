import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoGpsComponent } from './nuevo-gps.component';

describe('NuevoGpsComponent', () => {
  let component: NuevoGpsComponent;
  let fixture: ComponentFixture<NuevoGpsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuevoGpsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevoGpsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
