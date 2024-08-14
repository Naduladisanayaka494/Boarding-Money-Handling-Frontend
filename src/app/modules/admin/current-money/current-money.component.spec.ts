import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentMoneyComponent } from './current-money.component';

describe('CurrentMoneyComponent', () => {
  let component: CurrentMoneyComponent;
  let fixture: ComponentFixture<CurrentMoneyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrentMoneyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurrentMoneyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
