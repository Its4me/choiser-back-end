import { User } from './../shared/interfaces';
import { AuthCoreService } from './../core/services/authCore.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-main-app',
  templateUrl: './main-app.component.html',
  styleUrls: ['./main-app.component.scss']
})
export class MainAppComponent implements OnInit {

  user: User
  aSub: Subscription
  showStepper: boolean = false

  constructor(
    private authCoreServ: AuthCoreService
  ) { }

  ngOnInit() {
    this.aSub = this.authCoreServ.user$
    .subscribe(user => {
      if(!user.sex && !user.region && !user.lastname && !user.name){     
        this.showStepper = true
      }
      this.aSub.unsubscribe()
    })
    
 
  }
  onDataLoad(){
    this.showStepper = false
  }
}
