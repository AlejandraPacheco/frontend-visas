import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitasAgendadasAdministradorComponent } from './citas-agendadas-administrador.component';

describe('CitasAgendadasAdministradorComponent', () => {
  let component: CitasAgendadasAdministradorComponent;
  let fixture: ComponentFixture<CitasAgendadasAdministradorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CitasAgendadasAdministradorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CitasAgendadasAdministradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
