import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyTransctionsComponent } from './my-transctions.component';

describe('MyTransctionsComponent', () => {
  let component: MyTransctionsComponent;
  let fixture: ComponentFixture<MyTransctionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyTransctionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyTransctionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
