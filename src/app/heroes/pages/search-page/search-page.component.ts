import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Heroe } from '../../interfaces/heroe.interface';
import { HeroesService } from '../../services/heroes.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styles: [
  ]
})
export class SearchPageComponent {

  public searchInput = new FormControl('')
  public heroes: Heroe[] = [];
  public heroeSeleccionado?: Heroe;

  constructor (private heroesService: HeroesService) {}

  searchHero(): void {
    const value: string = this.searchInput.value || "";
    this.heroesService.getSuggestions(value).subscribe(heroes => {
      this.heroes = heroes;
    })
  }

  selectOption(e: MatAutocompleteSelectedEvent): void {
    if(!e.option.value) {
      this.heroeSeleccionado = undefined;
      return;
    }

    const heroe: Heroe = e.option.value;
    this.searchInput.setValue(heroe.superhero);
    this.heroeSeleccionado = heroe;
  }
}
