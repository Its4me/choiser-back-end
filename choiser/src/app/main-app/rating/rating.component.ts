import { AppService } from './../app.service';
import { User, RatingParams } from './../../shared/interfaces';
import { UserService } from './../../core/services/user.service';
import { AuthCoreService } from './../../core/services/authCore.service';
import { Component, OnInit, OnDestroy, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { RatingService } from './rating.service';
import { Observable, Subject, fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit, OnDestroy {
 @ViewChild('male') maleRef: ElementRef
 @ViewChild('female') femaleRef: ElementRef


  maleButton$
  femaleButton$
  onReload: Subject<any> = new Subject();

  user: User
  regions$: Observable<any>
  constructor(
    private authCoreServ: AuthCoreService,
    private userServ: UserService,
    private ratingServ: RatingService,
    private appServ: AppService
  ) { }

  ngOnInit() {
    // get user
    if (Object.keys(this.authCoreServ.getUser()).length == 0) {
      const _id = this.authCoreServ.getId()
      this.userServ.getUserFromBack(_id)
        .pipe(untilDestroyed(this))
        .subscribe(user => {
          this.user = user
          this.authCoreServ.setUser(user)
        })
    } else {
      this.user = this.authCoreServ.getUser()
      
    }
    // get regions
    this.regions$ = this.ratingServ.getRegion()

  }
    
    
  
  ngOnDestroy() { }

  refresh(data: RatingParams = {}, sex?: string) {

    if(sex){
      this.user.sex = sex
    }

    const params: RatingParams = {
      sex: data.sex? data.sex :  this.user.sex,
      region: data.region? data.region :  this.user.region
    }

    this.onReload.next(params)
  }
  openMenu(){
    this.appServ.toggle()
  }
  // buttonSubscribe(){
  //   this.maleButton$ = fromEvent(this.maleRef.nativeElement, 'click')
  //   this.maleButton$.pipe(debounceTime(3000)).subscribe(res => console.log('asdsda'))
  // }
}
