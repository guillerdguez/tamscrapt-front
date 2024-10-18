import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LetteringListaComponent } from './lettering-lista.component';

describe('LetteringListaComponent', () => {
  let component: LetteringListaComponent;
  let fixture: ComponentFixture<LetteringListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LetteringListaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LetteringListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
