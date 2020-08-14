import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NetactlistComponent } from './netactlist.component';

describe('NetactlistComponent', () => {
  let component: NetactlistComponent;
  let fixture: ComponentFixture<NetactlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NetactlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NetactlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
