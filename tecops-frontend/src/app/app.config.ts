import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';  // Importa provideHttpClient
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { PersonaComponent } from './views/persona/persona.component';
import { MatDialogModule } from '@angular/material/dialog'; //ayuda a crear el dialogo al agregar nuevo usuario al eliminar y crear tambien
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { FormsModule } from '@angular/forms'; //ayuda a los forms
import {MatInputModule}from '@angular/material/input'; //funciones de entrada
import { MatPaginatorModule } from '@angular/material/paginator'; //paginador 
import { MatSortModule } from '@angular/material/sort';



export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideAnimationsAsync(),
    provideHttpClient(),  // Proporciona el HttpClient aquí
    PersonaComponent,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    MatInputModule,
    HTMLInputElement,
    MatPaginatorModule,
    MatSortModule,
  ]
};
