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
  constructor(private pokemonService: PokemonService, private router: Router) {
    //this.pokemon = this.pokemons;
  }

  openPokemonDetails(pokemon: any){
     this.router.navigateByUrl('/pokemon-details');
     const objetoString = JSON.stringify(pokemon);
     localStorage.setItem('pokemon', objetoString);
  }

  ngOnInit() {
    for (let index = 1; index < 11; index++) {
      this.getPokemonDetails(index); 
    }
  }

  getPokemonDetails(id: number) {
    this.pokemonService.getPokemon(id)
      .subscribe(
        (data: any) => {
          this.pokemon = data;
         console.log( this.pokemon );
            this.pokemonList.push(this.pokemon)
        },
        (error: any) => {
          console.error(error);
        }
      );
  }
}
