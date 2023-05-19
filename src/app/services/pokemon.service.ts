import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private apiUrl = 'https://pokeapi.co/api/v2/';

  constructor(private http: HttpClient) { }

  getPokemons(limit: number): Observable<any> {
    const url = `${this.apiUrl}pokemon?limit=${limit}`;
    return this.http.get(url);
  }
}
