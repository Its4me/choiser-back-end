import { AppService } from './app.service';
import { Router, NavigationStart } from '@angular/router';
import { User } from './../shared/interfaces';
import { AuthCoreService } from './../core/services/authCore.service';
import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatSidenav } from '@angular/material/sidenav';
import { untilDestroyed } from 'ngx-take-until-destroy';

@Component({
  selector: 'app-main-app',
  templateUrl: './main-app.component.html',
  styleUrls: ['./main-app.component.scss']
})
export class MainAppComponent implements OnInit, OnDestroy {
 @ViewChild('sidenav') sidenavRef: MatSidenav
  

  user: User
  aSub: Subscription
  showStepper: boolean = false
  screenWidth: number
  mobileWidth: number = 992

  constructor(
    private authCoreServ: AuthCoreService,
    private router: Router,
    private appServ: AppService
  ) {
    this.screenWidth = window.innerWidth

    window.onresize = () => {
      this.screenWidth = window.innerWidth
    }
    this.appServ.navbar$
      .pipe(untilDestroyed(this))
      .subscribe(res => this.sidenavRef.toggle())

  }

  ngOnInit() {
    this.aSub = this.authCoreServ.user$
      .subscribe(user => {
        if (!user.sex && !user.region && !user.lastname && !user.name) {
          this.showStepper = true
        }
        this.aSub.unsubscribe()
      })



    this.router.events.subscribe(event => {
      if(event instanceof NavigationStart && this.sidenavRef.opened && this.screenWidth <= 992) 
        this.sidenavRef.close()
    })
  }

  ngOnDestroy(){}


  onDataLoad() {
    this.showStepper = false
  }
  onSwipeRigth($event){
    const slider: boolean = $event.target.classList.contains('swiper-wrapper')
    const img: boolean = $event.target.classList.contains('carousel-item-img')
    const imgBigSlider: boolean = $event.target.classList.contains('pswp__img')

    if(!slider && !img && !imgBigSlider && this.screenWidth <= this.mobileWidth){
      this.sidenavRef.open()
    }
    
  }

  onSwipeLeft($event){
    if(this.sidenavRef.opened && this.screenWidth <= this.mobileWidth){
      this.sidenavRef.close()
    }
  }
  
}
