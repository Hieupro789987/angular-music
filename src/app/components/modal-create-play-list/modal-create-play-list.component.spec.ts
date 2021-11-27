import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCreatePlayListComponent } from './modal-create-play-list.component';

describe('ModalCreatePlayListComponent', () => {
  let component: ModalCreatePlayListComponent;
  let fixture: ComponentFixture<ModalCreatePlayListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalCreatePlayListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCreatePlayListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
