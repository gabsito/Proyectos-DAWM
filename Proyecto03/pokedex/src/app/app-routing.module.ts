import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokedexComponent } from './components/pokedex/pokedex.component';
import { PokemonComponent } from './components/pokemon/pokemon.component';
import { SplashComponent } from './components/splash/splash.component';
import { StatsComponent } from './components/stats/stats.component';
import { FavoritesComponent } from './components/favorites/favorites.component';

const routes: Routes = [
  { path: 'splash', component: SplashComponent },
  { path: 'pokedex', component: PokedexComponent },
  { path: 'pokemon/:id', component: PokemonComponent },
  { path: 'pokemon/stats/:id', component: StatsComponent },
  { path: 'favorites', component: FavoritesComponent },
  { path: '', redirectTo: '/splash', pathMatch: 'full' },
  { path: '**', redirectTo: '/splash', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
