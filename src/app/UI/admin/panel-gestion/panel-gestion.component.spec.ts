import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelGestionComponent } from './panel-gestion.component';

describe('PanelGestionComponent', () => {
  let component: PanelGestionComponent;
  let fixture: ComponentFixture<PanelGestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PanelGestionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PanelGestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
