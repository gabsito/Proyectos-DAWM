import { Component, OnInit } from '@angular/core';
import { PokeService } from 'src/app/services/pokeservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.css']
})
export class PokedexComponent implements OnInit {

  pokemons: any[] = [];
  offset: number = 50;
  toLoad: number = 50;
  searchbar = document.getElementById('searchbar');
  searchQuery:string = '';
  filteredPokemons: any[] = [];
  favorite_button = document.getElementById('favorite_button');

  constructor(private pokeservice: PokeService, private router: Router) {
    let pokemon = localStorage.getItem('allInfo');
    if (pokemon) {
      this.pokemons = JSON.parse(pokemon);
    }
    this.filteredPokemons = this.pokemons;

  }

  ngOnInit(): void {
    console.log(this.pokemons);

  }

  getColor(type:string) {
    switch (type) {
      case 'grass':
        return 'rgb(62, 213, 151)';
      case 'fire':
        return 'rgb(255, 106, 98)';
      case 'water':
        return 'rgb(31, 172, 238)';
      case 'bug':
        return 'rgb(87, 213, 98)';
      case 'normal':
        return 'gray';
      case 'poison':
        return 'rgb(160, 64, 160)';
      case 'electric':
        return 'rgb(255, 200, 50)';
      case 'ground':
        return 'rgb(226, 191, 101)';
      case 'fairy':
        return 'rgb(214, 133, 173)';
      case 'fighting':
        return 'rgb(192, 48, 40)';
      case 'psychic':
        return 'rgb(248, 88, 136)';
      case 'rock':
        return 'rgb(184, 160, 56)';
      case 'ghost':
        return 'rgb(112, 88, 152)';
      case 'ice':
        return 'rgb(152, 216, 216)';
      case 'dragon':
        return 'rgb(112, 56, 248)';
      case 'dark':
        return 'rgb(112, 88, 72)';
      case 'steel':
        return 'rgb(184, 184, 208)';
      case 'flying':
        return 'rgb(168, 144, 240)';
      default:
        return 'white';
    }
  }

  searchPokemon() {

    if (this.searchQuery && this.searchQuery.length > 0) {
      this.filteredPokemons = this.pokemons.filter(pokemon => pokemon.name.includes(this.searchQuery));
    } else {
      this.filteredPokemons = this.pokemons;
    }
    console.log(this.filteredPokemons);

  }

}
