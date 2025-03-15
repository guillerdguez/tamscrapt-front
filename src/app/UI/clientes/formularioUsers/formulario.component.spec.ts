import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioComponentUser } from './formulario.component';

describe('FormularioComponentUser', () => {
  let component: FormularioComponentUser;
  let fixture: ComponentFixture<FormularioComponentUser>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormularioComponentUser],
    }).compileComponents();

    fixture = TestBed.createComponent(FormularioComponentUser);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
