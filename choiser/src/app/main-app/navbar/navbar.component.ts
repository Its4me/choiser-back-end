import { UserService } from '../../core/services/user.service';
import { User } from './../../shared/interfaces';
import { AuthCoreService } from './../../core/services/authCore.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  user$: Observable<User>

  constructor(
    private auth: AuthCoreService,
    private userServ: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    const _id = this.auth.getId()
    this.user$ = this.userServ.getUserFromBack(_id).pipe(
      map( user => {
        this.auth.setUser(user)
        return user
      })
    )
  }

  exit(){
    this.auth.setUser({})
    this.auth.setId(null)
    localStorage.setItem('_id', null)
    localStorage.setItem('token', null)
    this.router.navigate(['login'])
  }
}
