import { AuthCoreService } from './../../../core/services/authCore.service';
import { NotificationService } from './../notification.service';
import { SuperLike } from './../../../shared/interfaces';
import { Component, OnInit, Input, OnDestroy, Output } from '@angular/core';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-super-like',
  templateUrl: './super-like.component.html',
  styleUrls: ['./super-like.component.scss']
})
export class SuperLikeComponent implements OnInit, OnDestroy {

  @Input('superLike') superLike: SuperLike
  @Input('i') index: number
  @Output() deleteNotification = new EventEmitter()


  constructor(
    private notificationServ: NotificationService,
    private router: Router,
    private authCoreServ: AuthCoreService
  ) { }

  ngOnInit() {
  }

  ngOnDestroy(){}

  delete(){
    this.notificationServ.deleteById(this.superLike._id)
      .pipe(untilDestroyed(this))
      .subscribe(res => {
        this.deleteNotification.emit(this.index.toString())
      })
  }
  navigatePhrofile(){
    const _id = this.authCoreServ.getId()
    this.router.navigate(['user', _id])
  }
}