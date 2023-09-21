import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs'
import { Heroe } from '../../interfaces/heroe.interface';

@Component({
  selector: 'app-hero-page',
  templateUrl: './hero-page.component.html',
  styles: [
  ]
})
export class HeroPageComponent implements OnInit {

  public heroe?: Heroe;

  constructor (
    private heroesService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.
      pipe(
        switchMap( params => 
          this.heroesService.getHeroesById(params['id'])
        )
      ).subscribe( heroe => {
        if (!heroe) {
          this.router.navigateByUrl("/heroes/list");
        }
        this.heroe = heroe;
      })
  }

  goBack(): void {
    this.router.navigateByUrl("/heroes/list");
  }
  
}
