import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OmsDetailComponent } from './oms-detail.component';

describe('OmsDetailComponent', () => {
  let component: OmsDetailComponent;
  let fixture: ComponentFixture<OmsDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OmsDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OmsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
