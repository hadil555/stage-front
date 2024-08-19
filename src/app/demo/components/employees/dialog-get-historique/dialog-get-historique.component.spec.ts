import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogGetHistoriqueComponent } from './dialog-get-historique.component';

describe('DialogGetHistoriqueComponent', () => {
  let component: DialogGetHistoriqueComponent;
  let fixture: ComponentFixture<DialogGetHistoriqueComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogGetHistoriqueComponent]
    });
    fixture = TestBed.createComponent(DialogGetHistoriqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
