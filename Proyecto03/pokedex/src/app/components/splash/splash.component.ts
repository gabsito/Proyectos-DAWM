import { Component, OnInit } from '@angular/core';
import { PokeService } from 'src/app/services/pokeservice.service';
import { Router } from '@angular/router';
import { simplePokemon } from 'src/app/interfaces/ipokemon';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.css']
})
export class SplashComponent implements OnInit {
  offset: number = 0;
  toLoad: number = 1154;
  value = 0;

  constructor(private pokeservice: PokeService, private router: Router) { }

  async ngOnInit(): Promise<void> {
    await this.loadPokemon();
  }

  async loadPokemon() {
    let pokemons = localStorage.getItem('pokemon');

    if (!pokemons) {
      localStorage.setItem('pokemon', JSON.stringify(await this.pokeservice.getPokemons(this.toLoad, this.offset)));
    }

    let allInfo = localStorage.getItem('allInfo');
    if (!allInfo) {
      let pokes: simplePokemon[] = [];
      for (const poke in JSON.parse(pokemons??"").results) {
        let pokemon:simplePokemon = await this.pokeservice.getPokeNameandSprite(JSON.parse(pokemons??"").results[poke].url);
        pokes.push(pokemon);
      }
      localStorage.setItem('allInfo', JSON.stringify(pokes));
    }


    console.log(allInfo);

    this.router.navigate(['/pokedex']);

    let favorites = localStorage.getItem('favorites');
    if (!favorites) {
      localStorage.setItem('favorites', JSON.stringify([]));
    }

  }

}
