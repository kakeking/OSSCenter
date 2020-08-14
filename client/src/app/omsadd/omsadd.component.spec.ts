import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OmsaddComponent } from './omsadd.component';

describe('OmsaddComponent', () => {
  let component: OmsaddComponent;
  let fixture: ComponentFixture<OmsaddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OmsaddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OmsaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
