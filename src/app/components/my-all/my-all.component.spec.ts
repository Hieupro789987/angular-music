import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyAllComponent } from './my-all.component';

describe('MyAllComponent', () => {
  let component: MyAllComponent;
  let fixture: ComponentFixture<MyAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyAllComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
