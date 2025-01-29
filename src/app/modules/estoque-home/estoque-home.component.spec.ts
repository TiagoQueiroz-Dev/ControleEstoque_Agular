import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstoqueHomeComponent } from './estoque-home.component';

describe('EstoqueHomeComponent', () => {
  let component: EstoqueHomeComponent;
  let fixture: ComponentFixture<EstoqueHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstoqueHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstoqueHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
