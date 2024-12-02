import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialagoOfertaComponent } from './dialago-oferta.component';

describe('DialagoOfertaComponent', () => {
  let component: DialagoOfertaComponent;
  let fixture: ComponentFixture<DialagoOfertaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialagoOfertaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialagoOfertaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
