import { Component, OnInit, ViewChild } from '@angular/core';
import { PersonaService } from '../../service/persona.service';
import { Persona } from '../../model/persona';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { PersonaModalComponent } from './persona-modal/persona-modal.component';
import { MatIconModule } from '@angular/material/icon';
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';


@Component({
  selector: 'app-persona',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatFormField,
    MatInput,
    MatTableModule,
    MatPaginator
  ],
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css']
})
export class PersonaComponent implements OnInit {
  personas: Persona[] = [];
  dataSource: MatTableDataSource<Persona> = new MatTableDataSource();
  displayedColumns = ['idPersona', 'nombres', 'apellidos', 'edad', 'pais', 'acciones'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;


  constructor(
    private dialog: MatDialog,
    private personaService: PersonaService
  ) {}

  ngOnInit(): void {
    this.personaService.listar().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      console.log("Datos originales:", this.dataSource.data); // Verifica que los datos se carguen correctamente
      this.dataSource.paginator=this.paginator;
    });

    this.personaService.personaActualizar.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator=this.paginator;
    });
  }

  editar(persona?: Persona) {
    let person = persona != null ? persona : new Persona();
    this.dialog.open(PersonaModalComponent, {
      width: '260px',
      data: person
    });
  }

  eliminar(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(estado => {
      if (estado) {
        this.personaService.eliminar(id).subscribe(() => {
          this.personaService.listar().subscribe(data => {
            this.dataSource = new MatTableDataSource(data);
          });
        });
      }
    });
  }

  filtrar(event: KeyboardEvent): void {
    const input = event.target as HTMLInputElement;
    const valor = input.value.trim().toLowerCase();

    console.log("Valor de búsqueda:", valor); // Verifica el valor que se está buscando

    // Configurar el criterio de filtrado
    this.dataSource.filterPredicate = (data: Persona, filter: string) => {
      const nombres = data.nombres ? data.nombres.toLowerCase() : '';
      const apellidos = data.apellidos ? data.apellidos.toLowerCase() : '';
      return nombres.includes(filter) || apellidos.includes(filter);
    };

    // Aplicar el filtro
    this.dataSource.filter = valor;
    console.log("DataSource filtrado:", this.dataSource.filteredData); // Verifica los datos filtrados
  }
}
