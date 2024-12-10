import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ListOfPagesComponent } from './list-of-pages.component';

describe('ListOfPagesComponent', () => {
  let component: ListOfPagesComponent;
  let fixture: ComponentFixture<ListOfPagesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ListOfPagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOfPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
