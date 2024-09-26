import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs'; // Importar Observable
import { Persona } from '../model/persona';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  personaActualizar= new Subject<Persona[]>();

  private url: string = 'http://localhost:8080/personas';

  constructor(private http: HttpClient) { }

  listar(): Observable<Persona[]> {
    return this.http.get<Persona[]>(this.url); // Retornar el Observable
  }
  eliminar(id: number){
   return this.http.delete(`${this.url}/${id}`);

  }
  editar(persona: Persona){
   return this.http.put(this.url,persona);

  }

  agregar(persona: Persona){
   return this.http.post(this.url,persona);

  }

}
