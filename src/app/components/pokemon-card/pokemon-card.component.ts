import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pokemon } from 'src/app/models/pokemon.model';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.css']
})
export class PokemonCardComponent implements OnInit{
  @Input()
  pokemons: any;
  pokemon!: Pokemon;
  constructor(private router: Router, private pokemonService: PokemonService) {
    this.pokemon = this.pokemons;
  }

  openPokemonDetails(){
    this.router.navigateByUrl('/pokemon-details');
  }

  ngOnInit() {
    debugger
    this.getPokemonsData(20); // Obtém os dados do Pokémon com ID 1 (Bulbasaur), por exemplo
  }

  getPokemonsData(limit: number) {
    this.pokemonService.getPokemons(limit)
      .subscribe((data: any) => {
        this.pokemons = data.results;
      });
  }

}
