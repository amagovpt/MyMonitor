import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfPagesComponent } from './list-of-pages.component';

describe('ListOfPagesComponent', () => {
  let component: ListOfPagesComponent;
  let fixture: ComponentFixture<ListOfPagesComponent>;

  beforeEach(async(() => {
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
