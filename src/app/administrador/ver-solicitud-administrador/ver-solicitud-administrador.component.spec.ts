import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerSolicitudAdministradorComponent } from './ver-solicitud-administrador.component';

describe('VerSolicitudAdministradorComponent', () => {
  let component: VerSolicitudAdministradorComponent;
  let fixture: ComponentFixture<VerSolicitudAdministradorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerSolicitudAdministradorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VerSolicitudAdministradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
