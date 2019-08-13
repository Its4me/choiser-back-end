import { AppService } from './../app.service';
import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { NotificationService } from './notification.service';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { AuthCoreService } from 'src/app/core/services/authCore.service';

const STEP = 5


@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit, OnDestroy {

  @HostListener('window:scroll', ['$event']) 
    scrollHandler() {
      this.onScroll()
    }

  notifications: Notification[] = []
  loader: boolean = false
  skip: number = 0
  limit: number = STEP
  heigthOf5Article = 440
  waitNotifications = false


  constructor(
    private appServ: AppService,
    private notificationServ: NotificationService,
    private authCoreServ: AuthCoreService
  ) { }

  ngOnInit() {
    this.loader = true
    this.notificationServ.getAll({
      skip: this.skip,
      limit: this.limit})
      .pipe(untilDestroyed(this))
      .subscribe((res: Notification[]) => {
        this.notifications.push(...res)
        this.authCoreServ.setUserParam('notificationCount', 0)
        this.skip += STEP
        this.loader = false
      },err => {
        this.loader = false
      })
      
  }

  ngOnDestroy(){}

  deleteNotification(index: string){
    this.notifications.splice(Number(index), 1)
  }
  openMenu(){
    this.appServ.toggle()
  }

  loadMore(){
    this.waitNotifications = true
    this.notificationServ.getAll({
      skip: this.skip,
      limit: this.limit})
      .pipe(untilDestroyed(this))
      .subscribe((res: Notification[]) => {
        this.notifications.push(...res)
        this.skip += STEP
        this.waitNotifications = false
      })
  }

  onScroll(){
    if(!this.waitNotifications){
      const windowHeight = document.documentElement.clientHeight
      const height =  document.documentElement.scrollHeight
      const offset =  window.pageYOffset
      
      if(height <= (offset + windowHeight + 100)){
        this.loadMore()
      }
    }
    
  }
  daleteAll(){
    this.notificationServ.deleteAll()
    .pipe(untilDestroyed(this))
    .subscribe( res => this.notifications = [])
  }
}
