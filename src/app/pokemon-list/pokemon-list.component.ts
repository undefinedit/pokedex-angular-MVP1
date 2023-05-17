import { Component } from '@angular/core';
import { pokemons } from '../pokemons';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent {
  pokemons = pokemons;
}
