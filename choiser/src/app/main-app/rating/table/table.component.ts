import { Subject } from 'rxjs';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { RatingService } from '../rating.service';
import { RatingParams, User } from 'src/app/shared/interfaces';
import { untilDestroyed } from 'ngx-take-until-destroy';

const STEP = 10


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnDestroy {
  @Input() onReload: Subject<any>
  @Input() region: string
  @Input() sex: string

  users: User[]

  displayedColumns: string[] = [ 'position', 'avatar', 'name', 'rating']

  skip: number = 0
  limit: number = STEP

  constructor(
    private ratingServ: RatingService
  ) { }

  ngOnInit() {
    
    this.getUsers()
    

    this.onReload
      .pipe(untilDestroyed(this))
      .subscribe(res => this.getUsers(res))
  }

  ngOnDestroy(){}

  getUsers(data: RatingParams = {}){
    
    const params: RatingParams  = {
      skip: this.skip,
      limit:  this.limit,
      sex: data.sex? data.sex :  this.sex,
      region: data.region? data.region :  this.region
    }

    this.ratingServ.getUsers(params).subscribe(res => {
      this.users = res
    })
    
  }
  

}
