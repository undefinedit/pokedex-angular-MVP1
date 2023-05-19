import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pokemon } from 'src/app/models/pokemon.model';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.css']
})
export class PokemonCardComponent implements OnInit{
  @Input()
  pokemon!: any;
  pokemons: any;
  constructor(private router: Router) {
  }


  ngOnInit(): void {
    console.log(this.pokemons);
  }

  openPokemonDetails(){
    this.router.navigateByUrl('/pokemon-details');
  }
    
}
