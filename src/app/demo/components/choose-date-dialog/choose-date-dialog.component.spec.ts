import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseDateDialogComponent } from './choose-date-dialog.component';

describe('ChooseDateDialogComponent', () => {
  let component: ChooseDateDialogComponent;
  let fixture: ComponentFixture<ChooseDateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChooseDateDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChooseDateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
