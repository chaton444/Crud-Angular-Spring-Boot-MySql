import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PersonaComponent } from "./views/persona/persona.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PersonaComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'tecops-frontend';
}
