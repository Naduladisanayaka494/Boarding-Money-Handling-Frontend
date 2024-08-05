import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SepndMoneyComponent } from './sepnd-money.component';

describe('SepndMoneyComponent', () => {
  let component: SepndMoneyComponent;
  let fixture: ComponentFixture<SepndMoneyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SepndMoneyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SepndMoneyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
