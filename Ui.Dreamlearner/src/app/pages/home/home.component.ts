import { CommonModule } from '@angular/common';
import { Component, signal, HostListener, ElementRef, inject } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule], // Adiciona isto para suportar *ngIf
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent
{
  private authService = inject(AuthService);
  private router = inject(Router);

  // Criamos uma referência fácil para usar no HTML
  isLogged = this.authService.isLogged;

  toggleMenu(event: Event) {
    // Se não estiver logado, podemos redirecionar para login em vez de abrir menu
    if (!this.isLogged()) {
      this.router.navigate(['/']);
      return;
    }
    // ... lógica de abrir o menu que já tínhamos
    event.stopPropagation(); // Impede que este clique chegue ao HostListener imediatamente
    this.isMenuOpen.update(val => !val);
  }

  isMenuOpen = signal(false);
  private eRef = inject(ElementRef); // Referência ao componente <app-home>

  @HostListener('document:click', ['$event'])
  clickout(event: MouseEvent) {
    if (this.isMenuOpen()) {
      // Se o clique NÃO estiver dentro do elemento do componente (redimensionado agora)
      if (!this.eRef.nativeElement.contains(event.target)) {
        this.isMenuOpen.set(false);
      }
    }
  }

  logout() {
    this.authService.logout();
    console.log('A terminar sessão...');
  }

}

