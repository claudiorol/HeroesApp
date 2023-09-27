import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Heroe, Publisher } from '../../interfaces/heroe.interface';
import { HeroesService } from '../../services/heroes.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';


@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styles: [
  ]
})
export class NewPageComponent implements OnInit {

  constructor(
    private heroesService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog ) {}

  public heroeForm = new FormGroup({
    id: new FormControl<string>(''),
    superhero: new FormControl<string>('', {nonNullable: true}),
    publisher: new FormControl<Publisher>(Publisher.DCComics),
    alter_ego: new FormControl<string>(''),
    first_appearance: new FormControl<string>(''),
    characters: new FormControl<string>(''),
    alt_img: new FormControl<string>(''),
  });

  public publishers = [
    { id: "DC Comics" },
    { id: "Marvel Comics" }
  ];

  get currentHero(): Heroe {
    return this.heroeForm.value as Heroe
  }

  ngOnInit(): void {
    if (this.router.url.includes("new-hero")) return;

    this.activatedRoute.params
      .pipe(
        switchMap( ({ id }) => 
          this.heroesService.getHeroesById(id))).subscribe( (heroe) => {
            if (!heroe) {
              return this.router.navigateByUrl("/");
            }
            this.heroeForm.reset(heroe);
            return;
          })
  }

  onSubmit(): void {
    if (this.heroeForm.invalid) return;

    if (this.currentHero.id) {    //actualizamos heroe existente
      this.heroesService.updateHeroe(this.currentHero).subscribe( heroe => {
        this.router.navigateByUrl('/heroes/list');
        this.showSnackbar(`${ heroe.superhero } fue actualizado correctamente`);
      })
      return
    } else {                      //creamos heroe nuevo
      this.heroesService.addHeroe(this.currentHero).subscribe( heroe => {
        this.router.navigate(['/heroes/edit', heroe.id])
        this.showSnackbar(`${ heroe.superhero } fue creado correctamente`);
      })
    }
  }

  showSnackbar(msg: string): void {
    this.snackBar.open(msg, undefined, {duration:3000})
  }

  onDelete(): void {
    if ( !this.currentHero.id ) throw Error("No heroe id");
    const dialogRef = this.dialog.open(
      ConfirmDialogComponent,
      { data: this.heroeForm.value }
    );

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) return;
      this.heroesService.deleteHeroe(this.currentHero.id).subscribe( deleted => {
        this.router.navigateByUrl("/heroes/list");
      });
    })
  }
}
