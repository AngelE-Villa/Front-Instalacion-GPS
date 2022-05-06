import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerGpsComponent } from './ver-gps.component';

describe('VerGpsComponent', () => {
  let component: VerGpsComponent;
  let fixture: ComponentFixture<VerGpsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerGpsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerGpsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
