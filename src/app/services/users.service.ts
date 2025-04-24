import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { AuthenticationResponse } from '../models/authentication-response';
import { Register } from '../models/register';
import { environment } from '../../environment';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private baseUrl: string = environment.apiUrl;
  private _isAuthenticated = signal<boolean>(
    !!localStorage.getItem('authToken')
  );
  private _currentUserName = signal<string | null>(
    localStorage.getItem('currentUserName')
  );
  private _isAdmin = signal<boolean>(
    localStorage.getItem('isAdmin') === 'true'
  );

  // Exposing signals as readonly
  public isAuthenticated = this._isAuthenticated.asReadonly();
  public currentUserName = this._currentUserName.asReadonly();
  public isAdmin = this._isAdmin.asReadonly();

  constructor(private http: HttpClient) {
    // Constructor is now cleaner with signal initialization
  }

  register(register: Register): Observable<AuthenticationResponse> {
    return this.http
      .post<AuthenticationResponse>(`${this.baseUrl}register`, register)
      .pipe(
        tap((response) => {
          if (response.isSuccessful) {
            this.setAuthStatus(response.token, response.personName);
          }
        })
      );
  }

  login(email: string, password: string): Observable<AuthenticationResponse> {
    return this.http
      .post<AuthenticationResponse>(`${this.baseUrl}login`, { email, password })
      .pipe(
        tap((response) => {
          if (response.isSuccessful) {
            this.setAuthStatus(response.token, response.personName);
          }
        })
      );
  }

  setAuthStatus(token: string, currentUserName: string): void {
    this._isAuthenticated.set(true);
    this._currentUserName.set(currentUserName);
    // TODO: Determine if the user is an admin based on the token or response
    const isAdmin = false;
    this._isAdmin.set(isAdmin);

    localStorage.setItem('authToken', token);
    localStorage.setItem('currentUserName', currentUserName);
    localStorage.setItem('isAdmin', isAdmin.toString());
  }

  logout(): void {
    this._isAuthenticated.set(false);
    this._currentUserName.set(null);
    this._isAdmin.set(false);
    
    localStorage.removeItem('authToken');
    localStorage.removeItem('currentUserName');
    localStorage.removeItem('isAdmin');
  }
}
