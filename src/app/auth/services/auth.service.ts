import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environments } from 'src/environments/environments';
import { User } from '../interfaces/user.interface';
import { Observable, tap, map, of, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private baseUrl: string = environments.baseUrl;
  private usuario?: User;

  constructor(
    private httpClient: HttpClient) {}

  get currentUser(): User | undefined {
    if (!this.usuario) return undefined;
    return structuredClone(this.usuario);
  }

  login(email: string, password: string): Observable<User> {
    return this.httpClient.get<User>(this.baseUrl + "/users/1").pipe(
      tap( user => { this.usuario = user } ),
      tap( user => localStorage.setItem('token', 'Aa31GqjW25d6faFadf3052'))
    )
  }

  checkAuth(): Observable<boolean> {
    if (!localStorage.getItem('token')) return of(false)

    return this.httpClient.get<User>(this.baseUrl + "/users/1").pipe(
      tap( user => this.usuario = user),
      map( user => !!user),
      catchError( err => of(false) )
    )
  }

  logout() {
    this.usuario = undefined;
    localStorage.clear();
  }
}
