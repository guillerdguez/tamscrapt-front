import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidoDeailComponent } from './pedido-deail.component';

describe('PedidoDeailComponent', () => {
  let component: PedidoDeailComponent;
  let fixture: ComponentFixture<PedidoDeailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PedidoDeailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PedidoDeailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
