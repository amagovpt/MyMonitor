import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessibilityDeclarationComponent } from './accessibility-declaration.component';

describe('AccessibilityDeclarationComponent', () => {
  let component: AccessibilityDeclarationComponent;
  let fixture: ComponentFixture<AccessibilityDeclarationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccessibilityDeclarationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccessibilityDeclarationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
