import { ComponentFixture, TestBed } from '@angular/core/testing';

import {InputSwitchModule} from 'primeng/inputswitch';
describe('InputSwitchModule', () => {
  let component: InputSwitchModule;
  let fixture: ComponentFixture<InputSwitchModule>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InputSwitchModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InputSwitchModule);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
