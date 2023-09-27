import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, catchError, map } from 'rxjs';
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

  addHeroe(heroe: Heroe): Observable<Heroe> {
    let superhero = heroe.superhero.replaceAll(" ","-").toLowerCase();
    heroe.id = heroe.publisher == "Marvel Comics" ? "marvel-"+superhero : "dc-"+superhero;
    console.log(heroe.id);
    return this.httpClient.post<Heroe>(`${this.baseUrl}/heroes`, heroe);  //primer argumento la URL, segundo argumento el heroe que queremos añadir
  }

  updateHeroe(heroe: Heroe): Observable<Heroe> {
    if (!heroe.id) { throw Error('id is required') }
    return this.httpClient.patch<Heroe>(`${this.baseUrl}/heroes/${heroe.id}`, heroe);  //patch cambia solamente las propiedades diferentes, mientras put sustituye un objeto por otro
  }

  deleteHeroe(id: string): Observable<boolean> {
    return this.httpClient.delete(`${this.baseUrl}/heroes/${id}`)
      .pipe(
        catchError( err => of(false) ),
        map(resp => true)
      )
  }
}
