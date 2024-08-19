import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationDialogReportComponent } from './confirmation-dialog-report.component';

describe('ConfirmationDialogReportComponent', () => {
  let component: ConfirmationDialogReportComponent;
  let fixture: ComponentFixture<ConfirmationDialogReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmationDialogReportComponent]
    });
    fixture = TestBed.createComponent(ConfirmationDialogReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
