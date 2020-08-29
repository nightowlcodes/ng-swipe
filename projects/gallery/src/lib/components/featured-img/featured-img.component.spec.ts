import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedImgComponent } from './featured-img.component';

describe('FeaturedImgComponent', () => {
  let component: FeaturedImgComponent;
  let fixture: ComponentFixture<FeaturedImgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeaturedImgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeaturedImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
