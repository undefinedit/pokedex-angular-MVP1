import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private apiUrl = 'https://backend-pokeapi.azurewebsites.net';
  private apiUrlPokemon = 'https://backend-pokeapi.azurewebsites.net/pokemon';

  constructor(private http: HttpClient) { }

  getPokemonDescription(id: any){
    const url = `${this.apiUrl}/pokemon-species/${id}/`;
    return this.http.get(url);
  }

  getPokemons(url: string): Observable<any> {
    return this.http.get(url);
  }

  getPokemonPage(pageNumber: number, limit: number): Observable<any> {
    const offset = (pageNumber - 1) * limit;
    const url = `${this.apiUrlPokemon}?limit=${limit}&offset=${offset}`;

    return this.http.get(url);
  }

}
