import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private apiUrl = 'https://pokeapi.co/api/v2';

  private pokemons = [];

  constructor(private http: HttpClient) { }

  // getPokemonsURL(limit: any): Observable<any> {
  //   debugger
  //   const url = `${this.apiUrl}pokemon?limit=${limit}`;
  //   return this.http.get(url);
  // }

  // getPokemonsData(limit: number){
  //   debugger
  //   this.getPokemonsURL(limit).subscribe((data: any) => {
  //     debugger
  //     console.log(data.result);
  //     let pokemons = data.result.map((pokemon: any) => this.http.get(pokemon.url))
  //   })
  // }

  getPokemon(id: number): Observable<any> {
    const url = `${this.apiUrl}/pokemon/${id}`;
    return this.http.get(url);
  }

  getAllPokemons(limit: number): Observable<any> {
    const url = `${this.apiUrl}/pokemon?limit=${limit}`;
    return this.http.get(url);
  }

  getPokemonsWithDetails(limit: number): Observable<any> {
    return this.getAllPokemons(limit).pipe(
      map((response: any) => response.results),
      map((results: any[]) => {
        const requests = results.map(result => this.getPokemon(result.name));
        return forkJoin(requests);
      })
    );
  }

  getPokemonDescription(id: any){
    const url = `${this.apiUrl}/pokemon-species/${id}/`;
    return this.http.get(url);
  }

}
