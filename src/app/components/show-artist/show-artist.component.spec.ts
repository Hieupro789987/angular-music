import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowArtistComponent } from './show-artist.component';

describe('ShowArtistComponent', () => {
  let component: ShowArtistComponent;
  let fixture: ComponentFixture<ShowArtistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowArtistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowArtistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
