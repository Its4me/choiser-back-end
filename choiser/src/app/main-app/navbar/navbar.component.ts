import { UserService } from '../../core/services/user.service';
import { User } from './../../shared/interfaces';
import { AuthCoreService } from './../../core/services/authCore.service';
import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { untilDestroyed } from 'ngx-take-until-destroy';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {

  @Output() swipeLeft = new EventEmitter()

  user$: Observable<User>
  user: User
  constructor(
    private auth: AuthCoreService,
    private userServ: UserService,
    private router: Router
  ) { 

    this.auth.user$
      .pipe(untilDestroyed(this))
      .subscribe(user => this.user = user)
  }

  ngOnInit() {
    const _id = this.auth.getId()
    this.userServ.getUserFromBack(_id).pipe(
      map( user => {
        this.auth.setUser(user)
        return user
      }),
      untilDestroyed(this))
      .subscribe(user =>  this.user = user)
  }

  ngOnDestroy(){}

  swipeleft(){
    this.swipeLeft.emit()
  }

  exit(){
    this.auth.setUser({})
    this.auth.setId(null)
    localStorage.setItem('_id', null)
    localStorage.setItem('token', null)
    this.router.navigate(['login'])
  }

}
