import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokeService } from 'src/app/services/pokeservice.service';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css']
})
export class PokemonComponent implements OnInit {

  pokemon: any;
  species: any;
  color: string = "";
  idRaw = "";

  constructor(private route: ActivatedRoute, private pokeservice: PokeService) {
    this.route.params.subscribe(async params => {
      let id = params['id'];

      this.pokemon = await this.pokeservice.getPokemon(id);
      console.log(this.pokemon);

      // format pokemon id
      this.idRaw = this.pokemon.id.toString();
      this.pokemon.id = this.pokemon.id.toString().padStart(3, '0');

      this.color = this.getColor(this.pokemon.types[0].type.name);
      document.body.style.backgroundColor = this.color;

      await this.getSpeciesInfo();

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

}
