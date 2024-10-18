import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminVerProductoComponent } from './Admin-ver-producto.component';

describe('AdminVerProductoComponent', () => {
  let component: AdminVerProductoComponent;
  let fixture: ComponentFixture<AdminVerProductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminVerProductoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminVerProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
