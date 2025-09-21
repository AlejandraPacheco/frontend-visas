import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuncionarioConsularComponent } from './funcionario-consular.component';

describe('FuncionarioConsularComponent', () => {
  let component: FuncionarioConsularComponent;
  let fixture: ComponentFixture<FuncionarioConsularComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FuncionarioConsularComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FuncionarioConsularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
