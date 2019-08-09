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
    private appServ: AppService
  ) { }

  ngOnInit() {
    this.photos$ = this.choiseServ.fetch()
  }
  ngOnDestroy(){}

  onVote(e: Photo){
    this.choiseServ.vote(e).pipe(untilDestroyed(this)).subscribe()
    this.photos$ = null
    this.photos$ = this.choiseServ.fetch()
  }

  skip(){
    this.photos$ = null
    this.photos$ = this.choiseServ.fetch()
  }
  openMenu(){
    this.appServ.toggle()
  }
}
