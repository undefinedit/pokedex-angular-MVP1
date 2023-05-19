import { Component, OnInit} from '@angular/core';
import { pokemons } from '../../pokemons';
import { PokemonService } from 'src/app/services/pokemon.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {
  pokemons = pokemons;
  pokemonsURL: string[] = [];
  pokemon: any;
  pokemonList: any[]=[];

  currentPage = 1;
  limit = 10;
  constructor(private pokemonService: PokemonService, private router: Router) {
  }

  openPokemonDetails(pokemon: any){
     this.router.navigateByUrl('/pokemon-details');
     const objetoString = JSON.stringify(pokemon);
     localStorage.setItem('pokemon', objetoString);
  }

  ngOnInit() {
    this.fetchPokemonPage()
  }

  fetchPokemonPage() {
    debugger
    this.pokemonService.getPokemonPage(this.currentPage, this.limit)
      .subscribe(
        (data: any) => {
          debugger
          let pokeUrls = data.results;
          for (let index = 0; index < pokeUrls.length; index++) {
            this.getPokemons(pokeUrls[index].url) 
          }      
        },
        error => {
          console.log('Error:', error);
        }
      );
  }

  nextPage() {
    this.pokemonList = [];
    this.currentPage++;
    this.fetchPokemonPage();
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.pokemonList = [];
      this.currentPage--;
      this.fetchPokemonPage();
    }
  }

  getPokemons(url: string) {
    this.pokemonService.getPokemons(url)
      .subscribe(
        (data: any) => {
          this.pokemonList.push(data)
          console.log( this.pokemonList); // or update a variable to store the details
        },
        error => {
          console.log('Error:', error);
        }
      );
  }

}
