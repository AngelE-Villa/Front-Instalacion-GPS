import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoModeloGpsComponent } from './nuevo-modelo-gps.component';

describe('NuevoModeloGpsComponent', () => {
  let component: NuevoModeloGpsComponent;
  let fixture: ComponentFixture<NuevoModeloGpsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuevoModeloGpsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevoModeloGpsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
