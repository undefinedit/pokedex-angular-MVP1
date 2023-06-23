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
    
    // this.getPokemonDescription(this.pokemon.id)
  }


 /* 
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
*/

  heightMask(id: number): string {
    var idString = id.toString();
    var indice = 1;
    if (idString.length == 1) {
      var idComVirgula = `0,${idString}`;
      return idComVirgula
    }
    var idComVirgula =  idString.slice(0, indice) + "," + idString.slice(indice);;
    return idComVirgula
  }

  getPokemonTypeClass(type: string): string {
    return type.toLowerCase();
  }

  getPokemonAttributeClass(type: string): string {
    return type.toLowerCase();
  }

}
