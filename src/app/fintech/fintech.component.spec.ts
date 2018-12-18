import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FintechComponent } from './fintech.component';

describe('FintechComponent', () => {
  let component: FintechComponent;
  let fixture: ComponentFixture<FintechComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FintechComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FintechComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
