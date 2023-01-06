import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { simplePokemon } from '../interfaces/ipokemon';
import { pokePage } from 'src/app/interfaces/IResponse';

@Injectable({
  providedIn: 'root'
})
export class PokeService {

  constructor(private http: HttpClient) { }

  async getPokemon(id: number) {
    let pokemon = await this.http.get(`https://pokeapi.co/api/v2/pokemon/${id}`).toPromise();
    return pokemon;
  }

  async getPokemons(limit: number, offset: number) {
    let pokemons = await this.http.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`).toPromise();
    return pokemons;
  }

  async getPokeInfo(url: string) {
    let info = await this.http.get(url).toPromise();
    return info;
  }

  async getPokeNameandSprite(url: string) {
    let info: pokePage|any = await this.getPokeInfo(url);
    let poke: simplePokemon = {
      name: info?.name,
      sprite: info.sprites.front_default,
      url: url,
      type: info.types[0].type.name
    }
    return poke;
  }

  async searchPokemon(contains: string) {
    let pokemons = await this.http.get(`https://pokeapi.co/api/v2/pokemon?name=${contains}`).toPromise();
    return pokemons;
  }
}
