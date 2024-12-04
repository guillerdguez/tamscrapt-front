import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioComponentProducto } from './formulario.component';

describe('FormularioComponentProducto', () => {
  let component: FormularioComponentProducto;
  let fixture: ComponentFixture<FormularioComponentProducto>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormularioComponentProducto],
    }).compileComponents();

    fixture = TestBed.createComponent(FormularioComponentProducto);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
