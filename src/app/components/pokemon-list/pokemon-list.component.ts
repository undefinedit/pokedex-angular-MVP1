import { Component, OnInit} from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {
  pokemonsURL: string[] = [];
  pokemon: any;
  pokemonList: any[] = [];
  pokemonName: string = "";
  currentPage = 1;
  limit = 10;
  constructor(private pokemonService: PokemonService, private router: Router) {}

  openPokemonDetails(pokemon: any){
     this.router.navigateByUrl('/pokemon-details');
     const objetoString = JSON.stringify(pokemon);
     localStorage.setItem('pokemon', objetoString);
  }

  ngOnInit() {
    this.fetchPokemonPage()
  }

  fetchPokemonPage() {
    this.pokemonService.getPokemonPage(this.currentPage, this.limit)
      .subscribe(
        (data: any) => {
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
        },
        error => {
          console.log('Error:', error);
        }
      );
  }

  searchPokemon(){
    let filteredPokemons = this.pokemonList.filter(f => f.name.toLowerCase().startsWith(this.pokemonName.toLocaleLowerCase()));

    if(filteredPokemons.length > 0){
      this.pokemonList = filteredPokemons;
    }
  }

  resetList(){
    if(this.pokemonName === ""){
      this.pokemonList = [];
      this.currentPage;
      this.fetchPokemonPage();
    }
  }

}
