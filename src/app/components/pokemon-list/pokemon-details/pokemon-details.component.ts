import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '../../../services/pokemon.service';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.css']
})
export class PokemonDetailsComponent implements OnInit {
  pokemon: any;
  pokemonDescription: any;
  valor: number = 0; 
  constructor(private route: ActivatedRoute, private pokemonService: PokemonService) { }

  ngOnInit(): void {
    let pokemonObject = localStorage.getItem('pokemon');

    if (pokemonObject != null) {
      this.pokemon = JSON.parse(pokemonObject);
    } else {
      this.pokemon = []
    }
    
    this.getPokemonDescription(this.pokemon.id)
    this.atualizarValor(this.pokemon.stats[2].base_stat)
    this.atualizarValor(this.pokemon.stats[5].base_stat)
    this.atualizarValor(this.pokemon.stats[0].base_stat)
    this.atualizarValor(this.pokemon.stats[1].base_stat)
  }

  atualizarValor(novoValor: number) {
    this.valor = novoValor;
  }

  getPokemonDescription(id: number) {
    this.pokemonService.getPokemonDescription(id)
      .subscribe(
        (data: any) => {
          this.pokemonDescription = data;
        },
        (error: any) => {
          console.error(error);
        }
      );
  }

  getPokemonTypeClass(type: string): string {
    return type.toLowerCase();
  }

  getPokemonAttributeClass(type: string): string {
    return type.toLowerCase();
  }

}
