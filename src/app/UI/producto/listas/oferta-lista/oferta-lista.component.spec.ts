import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfertaListaComponent } from './oferta-lista.component';

describe('OfertaListaComponent', () => {
  let component: OfertaListaComponent;
  let fixture: ComponentFixture<OfertaListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OfertaListaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OfertaListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
