import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

export interface AuthResponse {
  token: string;
  email: string;
  fullName: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  fullName: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<any>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  private readonly TOKEN_KEY = 'auth_token';
  private readonly USER_KEY = 'auth_user';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.loadUserFromStorage();
  }

  private loadUserFromStorage() {
    const token = localStorage.getItem(this.TOKEN_KEY);
    const user = localStorage.getItem(this.USER_KEY);
    if (token && user) {
      this.currentUserSubject.next(JSON.parse(user));
    }
  }

  login(credentials: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${environment.apiUrl}/api/auth/login`, credentials).pipe(
      tap(response => this.handleAuthentication(response.token, response))
    );
  }

  register(data: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${environment.apiUrl}/api/auth/register`, data).pipe(
      tap(response => this.handleAuthentication(response.token, response))
    );
  }

  // Guarda token e dados do utilizador
  private handleAuthentication(token: string, user: any) {
    localStorage.setItem(this.TOKEN_KEY, token);
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  // Logout
  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  // Getter para o token
  get token(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  // Verifica se o utilizador está autenticado
  isLoggedIn(): boolean {
    const token = this.token;
    if (!token) {
      return false;
    }

    // Opcional: verificar se o token ainda é válido (expiração)
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const exp = payload.exp * 1000;
      if (Date.now() >= exp) {
        this.logout(); // token expirado → faz logout automático
        return false;
      }
      return true;
    } catch {
      // Token inválido → logout
      this.logout();
      return false;
    }
  }

  // Obtém o utilizador atual (síncrono)
  get currentUserValue() {
    return this.currentUserSubject.value;
  }
}
