import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalWrapComponent } from './modal-wrap.component';

describe('ModalWrapComponent', () => {
  let component: ModalWrapComponent;
  let fixture: ComponentFixture<ModalWrapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalWrapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalWrapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
