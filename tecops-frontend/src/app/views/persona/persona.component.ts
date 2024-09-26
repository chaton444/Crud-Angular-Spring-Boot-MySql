import { Component, OnInit } from '@angular/core';
import { PersonaService } from '../../service/persona.service';
import { Persona } from '../../model/persona';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { PersonaModalComponent } from './persona-modal/persona-modal.component';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-persona',
  standalone: true,
  imports: [CommonModule,
    MatIconModule
  ],
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css']
})
export class PersonaComponent implements OnInit {
  personas: Persona[] = [];
  dataSource: MatTableDataSource<Persona> = new MatTableDataSource();
  // Declara el dataSource correctamente

  constructor(
    private dialog: MatDialog,
    private personaService: PersonaService
  ) {}

  ngOnInit(): void {
    this.personaService.personaActualizar.subscribe(data=>{
      this.dataSource=new MatTableDataSource(data);
    })
    this.personaService.listar().subscribe(data => {
      this.dataSource = new MatTableDataSource(data); // Cambié el operador de flecha
    });
  }


  editar(persona?:Persona){
   let person= persona !=null?persona:new Persona();
    this.dialog.open(PersonaModalComponent,{
      width:'260px',
      data: person
    })
  }

  eliminar(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      // Puedes pasar configuración de diálogo aquí si es necesario
      disableClose:true
    });
    
    dialogRef.afterClosed().subscribe(estado => { // Cambié `subscribe()` para incluir los paréntesis
      if (estado) {
        this.personaService.eliminar(id).subscribe(() => {
          this.personaService.listar().subscribe(data => {
            this.dataSource = new MatTableDataSource(data); // Actualizar el dataSource después de eliminar
          });
        });
      }
    });
  }
}
