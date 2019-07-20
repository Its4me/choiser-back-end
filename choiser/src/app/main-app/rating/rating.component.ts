import { User } from './../../shared/interfaces';
import { UserService } from './../../core/services/user.service';
import { AuthCoreService } from './../../core/services/authCore.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { RatingService } from './rating.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit, OnDestroy {

  user: User
  regions$: Observable<any>

  constructor(
    private authCoreServ: AuthCoreService,
    private userServ: UserService,
    private ratingServ: RatingService
  ) { }

  ngOnInit() {
    // get user
    if(Object.keys(this.authCoreServ.getUser()).length == 0){
      const _id = this.authCoreServ.getId()
      this.userServ.getUserFromBack(_id)
        .pipe(untilDestroyed(this))
        .subscribe(user => {
          this.user = user
          this.authCoreServ.setUser(user)
        })
    }else {
      this.user = this.authCoreServ.getUser()
    }

    // get regions
    this.regions$ = this.ratingServ.getRegion()
    
  }
  ngOnDestroy(){}
  
  refresh(){}
}
