import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NetactDetailComponent } from './netact-detail.component';

describe('NetactDetailComponent', () => {
  let component: NetactDetailComponent;
  let fixture: ComponentFixture<NetactDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NetactDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NetactDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
