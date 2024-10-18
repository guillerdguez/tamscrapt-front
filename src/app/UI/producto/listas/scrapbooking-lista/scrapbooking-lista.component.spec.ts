import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrapbookingListaComponent } from './scrapbooking-lista.component';

describe('ScrapbookingListaComponent', () => {
  let component: ScrapbookingListaComponent;
  let fixture: ComponentFixture<ScrapbookingListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ScrapbookingListaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ScrapbookingListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
