import { User, RatingParams } from './../../shared/interfaces';
import { UserService } from './../../core/services/user.service';
import { AuthCoreService } from './../../core/services/authCore.service';
import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { RatingService } from './rating.service';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit, OnDestroy {

  onReload: Subject<any> = new Subject();

  user: User
  regions$: Observable<any>
  constructor(
    private authCoreServ: AuthCoreService,
    private userServ: UserService,
    private ratingServ: RatingService
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
}
