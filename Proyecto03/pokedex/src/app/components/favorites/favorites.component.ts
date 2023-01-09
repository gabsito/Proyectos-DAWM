import { Component, OnInit } from '@angular/core';
import { PokeService } from 'src/app/services/pokeservice.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
  pokemon: any;
  favorites: any;
  allInfo: any;

  constructor(private pokeService: PokeService) {
    this.getFavorites();
    this.getAllInfo();
    this.loadPokemon();
    console.log(this.allInfo);

   }

  ngOnInit(): void {
  }

  getFavorites() {
    if(localStorage.getItem('favorites')) {
      this.favorites = JSON.parse(localStorage.getItem('favorites') || '{}');
    }
    console.log(this.favorites);
  }

  getAllInfo() {
    if(localStorage.getItem('allInfo')) {
      this.allInfo = JSON.parse(localStorage.getItem('allInfo') || '{}')
    }
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

  loadPokemon() {
    this.pokemon = this.allInfo.filter((poke: any) => this.favorites.includes(poke.id.toString()));
    console.log(this.pokemon);
  }

}
