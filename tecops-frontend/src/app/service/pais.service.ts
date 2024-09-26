import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'; // Importar Observable
import { Pais } from '../model/pais';

@Injectable({
  providedIn: 'root'
})
export class PaisService {
  private url: string = 'http://localhost:8080/pais';

  constructor(private http: HttpClient) { }

  listar(): Observable<Pais[]> {
    return this.http.get<Pais[]>(this.url); // Retornar el Observable
  }

}
