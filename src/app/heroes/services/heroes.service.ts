import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, catchError } from 'rxjs';
import { Heroe } from '../interfaces/heroe.interface';
import { environments } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})

export class HeroesService {

  private baseUrl: string = environments.baseUrl;

  constructor(private httpClient: HttpClient) { }

  getHeroes():Observable<Heroe[]> {
    return this.httpClient.get<Heroe[]>(`${this.baseUrl}/heroes`);
  }

  getHeroesById(id: string):Observable<Heroe | undefined> {
    return this.httpClient.get<Heroe>(`${ this.baseUrl }/heroes/${id}`)
      .pipe(
        catchError(error => of(undefined))  //si devolviesemos el undefined sin el of, no sería observable, por tanto, no cumpliría con lo que devuelve la función
      );
  }

  getSuggestions(query: string): Observable<Heroe[]> {
    return this.httpClient.get<Heroe[]>(`${ this.baseUrl }/heroes?q=${query}&_limit=6`)
  }
}
