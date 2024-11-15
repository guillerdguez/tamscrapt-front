import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EsquemaListaComponent2 } from './esquema-lista.component';

describe('EsquemaListaComponent', () => {
  let component: EsquemaListaComponent2;
  let fixture: ComponentFixture<EsquemaListaComponent2>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EsquemaListaComponent2],
    }).compileComponents();

    fixture = TestBed.createComponent(EsquemaListaComponent2);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
