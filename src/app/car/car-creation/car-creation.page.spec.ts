import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewCarPage } from './car-creation.page';

describe('NewCarPage', () => {
  let component: NewCarPage;
  let fixture: ComponentFixture<NewCarPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
