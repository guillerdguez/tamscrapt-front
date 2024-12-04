import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EsquemaListaComponent } from './esquema-lista.component';

describe('EsquemaListaComponent', () => {
  let component: EsquemaListaComponent;
  let fixture: ComponentFixture<EsquemaListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EsquemaListaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EsquemaListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
