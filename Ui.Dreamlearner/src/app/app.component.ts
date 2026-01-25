import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';  // ← adiciona este import

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,  // ← adiciona aqui
    // outros módulos que já tenhas, ex.: MatCardModule, etc.
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'DreamLearner';
}
