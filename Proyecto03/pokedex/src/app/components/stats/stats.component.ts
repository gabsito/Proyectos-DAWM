import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokeService } from 'src/app/services/pokeservice.service';


@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {
  pokemon: any;
  idFormat = "";
  species: any;
  color: string = "";
  favorites: string[] = [];

  constructor(private route: ActivatedRoute, private pokeservice: PokeService) {
    this.route.params.subscribe(async params => {
      let id = params['id'];

      this.pokemon = await this.pokeservice.getPokemon(id);
      console.log(this.pokemon);

      this.idFormat = this.pokemon.id.toString().padStart(3, '0');

      this.color = this.getColor(this.pokemon.types[0].type.name);
      document.body.style.backgroundColor = this.color;

      await this.getSpeciesInfo();

      this.getFavorites();

    });
   }

  ngOnInit(): void {
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

  async getSpeciesInfo() {
    let url = this.pokemon.species.url;
    this.species = await this.pokeservice.getPokeInfo(url);
    console.log(this.species);
  }


//  rate stat
  rateStat(stat: number) {
    if (stat >= 200) {
      return '#0E4490';
    } else if (stat >= 150) {
      return '#18915C';
    } else if (stat >= 100) {
      return '#FACF48';
    } else if (stat >= 50) {
      return '#F32E12';
    } else {
      return '#DD0000';
    }
  }

  // get formated string height and weight in meters, kilograms
  getFormatedHeight() {
    let height = this.pokemon.height;
    return (height / 10).toString() + " m";
  }
  getFormatedWeight() {
    let weight = this.pokemon.weight;
    return (weight / 10).toString() + " kg";
  }

  getTotalStats() {
    let total = 0;
    for (let i = 0; i < this.pokemon.stats.length; i++) {
      total += this.pokemon.stats[i].base_stat;
    }
    return total;
  }

  favorite() {
    if(this.isFavorite(this.pokemon.id)) {
      this.favorites = this.favorites.filter((id: string) => id !== this.pokemon.id.toString());
      localStorage.setItem('favorites', JSON.stringify(this.favorites));
    }
    else {
      this.favorites.push(this.pokemon.id.toString());
      localStorage.setItem('favorites', JSON.stringify(this.favorites));
    }

  }

  isFavorite(id: string) {
    return this.favorites.includes(id.toString());
  }

  getFavorites() {
    if(localStorage.getItem('favorites')) {
      this.favorites = JSON.parse(localStorage.getItem('favorites') || '{}');
    }
  }

}
