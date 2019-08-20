import { Subject } from 'rxjs';
import { Component, OnInit, Input, OnDestroy, HostListener } from '@angular/core';
import { RatingService } from '../rating.service';
import { RatingParams, User } from 'src/app/shared/interfaces';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { MatTableDataSource } from '@angular/material/table';

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
  @HostListener ('window:scroll', ['$event']) 
    scrollHandler() {
      this.onScroll()
    }
  
  waitUsers: boolean = false
  noMoreUsers: boolean = false

  users = new MatTableDataSource<User>([])

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
      .subscribe((res: RatingParams) => {
        this.skip = 0
        this.users.data = []
        this.noMoreUsers = false
        this.waitUsers = false
        this.getUsers(res)
      })
  }

  ngOnDestroy(){}

  getUsers(data: RatingParams = {}){
    this.waitUsers = true
    const params: RatingParams  = {
      skip: this.skip,
      limit:  this.limit,
      sex: data.sex? data.sex :  this.sex,
      region: data.region? data.region :  this.region
    }

    this.ratingServ.getUsers(params)
      .pipe(untilDestroyed(this))
      .subscribe(res => {
        if(res.length < 1 && this.users.data.length >= 1){
          this.noMoreUsers = true
        }else {
          const data = this.users.data
          data.push(...res)
          this.users.data = data
          
          this.waitUsers = false
          this.skip += STEP
        }
      }, err => {
        this.waitUsers = false
      })
  }
  onScroll(){
   
    
    if(!this.waitUsers && !this.noMoreUsers){
      const windowHeight = document.documentElement.clientHeight
      const height =  document.documentElement.scrollHeight
      const offset =  window.pageYOffset
      if(height <= (offset + windowHeight + 200)){
        this.getUsers()
      }
    }
  }
  

}
