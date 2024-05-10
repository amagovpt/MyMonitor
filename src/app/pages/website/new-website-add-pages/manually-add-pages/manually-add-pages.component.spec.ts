import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManuallyAddPagesComponent } from './manually-add-pages.component';

describe('ManuallyAddPagesComponent', () => {
  let component: ManuallyAddPagesComponent;
  let fixture: ComponentFixture<ManuallyAddPagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManuallyAddPagesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManuallyAddPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
