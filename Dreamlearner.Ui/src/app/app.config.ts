// src/app/app.config.ts
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';  // se tiveres rotas separadas
import { authInterceptor } from './auth/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), // opcional: melhora performance
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([authInterceptor])  // ← interceptor registado aqui
    )
    // adiciona outros providers (ex.: provideAnimations(), etc.)
  ]
};
