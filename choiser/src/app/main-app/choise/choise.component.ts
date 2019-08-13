import { Material } from 'src/app/shared/classes/material';
import { AuthCoreService } from './../../core/services/authCore.service';
import { AppService } from './../app.service';
import { Photo } from './../../shared/interfaces';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChoiseService } from './choise.service';
import { Observable } from 'rxjs';
import { untilDestroyed } from 'ngx-take-until-destroy';

@Component({
  selector: 'app-choise',
  templateUrl: './choise.component.html',
  styleUrls: ['./choise.component.scss']
})
export class ChoiseComponent implements OnInit, OnDestroy {

  photos$: Observable<{photos: Photo[]}>


  constructor(
    private choiseServ: ChoiseService,
    private appServ: AppService,
    private authCoreServ: AuthCoreService,
    private material: Material
  ) { }

  ngOnInit() {
    this.photos$ = this.choiseServ.fetch()
  }
  ngOnDestroy(){}

  onVote(e: Photo){
    this.choiseServ.vote(e, false).pipe(untilDestroyed(this)).subscribe()
    this.photos$ = null
    this.photos$ = this.choiseServ.fetch()
  }
  onVoteSuperLike(e: Photo){
    if(this.authCoreServ.getUser().coins == 0) {
      this.material.openSnackBar('Не хватает coin-ов')
      return
    }
    this.choiseServ.vote(e, true)
      .pipe(untilDestroyed(this))
      .subscribe( 
        res => {
          this.authCoreServ.setUserParam('coins', res.coins)
          this.photos$ = null
          this.photos$ = this.choiseServ.fetch()
        },
        err => this.material.openSnackBar(err.error.message)
      )
  }
  skip(){
    this.photos$ = null
    this.photos$ = this.choiseServ.fetch()
  }
  openMenu(){
    this.appServ.toggle()
  }
 
}
