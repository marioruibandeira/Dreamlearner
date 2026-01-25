import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  template: `
    <div class="home">
      <h1>Welcome to DreamLearner </h1>
      <p>You are logged in.</p>
    </div>
  `,
  styles: [`
    .home {
      padding: 2rem;
      text-align: center;
    }
  `]
})
export class HomeComponent {}

