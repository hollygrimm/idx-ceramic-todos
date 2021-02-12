import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MySnackBarComponent } from './my-snack-bar.component';

describe('MySnackBarComponent', () => {
  let component: MySnackBarComponent;
  let fixture: ComponentFixture<MySnackBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MySnackBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MySnackBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
