import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OmslistComponent } from './omslist.component';

describe('OmslistComponent', () => {
  let component: OmslistComponent;
  let fixture: ComponentFixture<OmslistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OmslistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OmslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
