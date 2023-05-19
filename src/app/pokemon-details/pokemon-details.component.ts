import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '../services/pokemon.service';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.css']
})
export class PokemonDetailsComponent implements OnInit {
  pokemon: any;
  pokemonDescription: any;

  constructor(private route: ActivatedRoute, private pokemonService: PokemonService) {}

  ngOnInit(): void {
    let pokemonObject = localStorage.getItem('pokemon');

    if(pokemonObject != null){
      this.pokemon = JSON.parse(pokemonObject);
    }else{
      this.pokemon = []
    }  
      this.getPokemonDescription(this.pokemon.id)
  }

  getPokemonDescription(id: number) {
    this.pokemonService.getPokemonDescription(id)
      .subscribe(
        (data: any) => {
          this.pokemonDescription = data;
          console.log(this.pokemonDescription);
    
        },
        (error: any) => {
          console.error(error);
        }
      );
  }

}
