import { Component, OnInit } from '@angular/core';
import { HeroesService } from 'src/app/services/heroes.service';
import { HeroeModel } from 'src/app/models/heroe.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  heroes:HeroeModel[] = [];

  constructor(private heroesService: HeroesService) {

  }

  ngOnInit() {
      this.heroesService.getHeroes()
      .subscribe( resp => this.heroes = resp );
  }

  deleteHeroe( heroe:HeroeModel, i:number ){

    Swal.fire({
      title: "¿Está Seguro?",
      text: `¿está seguro que desea eliminar a: ${ heroe.nombre } ?`,
      type: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then( resp => {

      if ( resp.value ){

        this.heroesService.deleteHeroe( heroe.id )
          .subscribe(  resp => console.log(resp) );

        this.heroes.splice(i,1);

      }

    })

  }

}
