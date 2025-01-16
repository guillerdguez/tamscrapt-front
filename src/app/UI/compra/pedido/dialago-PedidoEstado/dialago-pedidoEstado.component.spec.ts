import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DialagoPedidoEstadoComponent } from './dialago-pedidoEstado.component';

 
describe('DialagoPedidoEstadoComponent', () => {
  let component: DialagoPedidoEstadoComponent;
  let fixture: ComponentFixture<DialagoPedidoEstadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialagoPedidoEstadoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DialagoPedidoEstadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
