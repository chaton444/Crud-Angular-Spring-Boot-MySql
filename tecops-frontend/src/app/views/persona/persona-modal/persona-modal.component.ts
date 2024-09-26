import { Component, Inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { Persona } from '../../../model/persona';
import { PersonaService } from '../../../service/persona.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { PaisService } from '../../../service/pais.service';
import { Pais } from '../../../model/pais';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-persona-modal',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    MatInput
  ],
  templateUrl: './persona-modal.component.html',
  styleUrls: ['./persona-modal.component.css']
})
export class PersonaModalComponent {
  persona: Persona = new Persona();
  pais: Pais[] = [];

  constructor(
    private dialogRef: MatDialogRef<PersonaModalComponent>,
    private personaService: PersonaService,
    private paisService: PaisService,
    @Inject(MAT_DIALOG_DATA) private data: Persona
  ) {}

  ngOnInit(): void {
    // Inicializa la persona con los datos recibidos
    this.persona.idPersona = this.data.idPersona;
    this.persona.nombres = this.data.nombres;
    this.persona.apellidos = this.data.apellidos;
    this.persona.edad = this.data.edad;
    this.persona.pais = this.data.pais; // Asigna el país recibido

    // Llama al servicio para listar los países
    this.paisService.listar().subscribe(data => {
      this.pais = data; // Asigna los países a la propiedad pais
    });
  }


 
  aceptar(){
    if(this.persona!=null && this.persona.idPersona>0){

    

    this.personaService.editar(this.persona).subscribe(()=>{
      return this.personaService.listar().subscribe(data=>{
        this.personaService.personaActualizar.next(data);
      })
    })
  }else{
    this.personaService.agregar(this.persona).subscribe(()=>{
      this.personaService.listar().subscribe(data=>{
        this.personaService.personaActualizar.next(data);
      })
    })
    }
    this.cancelar();

  }

  cancelar(){
    this.dialogRef.close();

  }
}
