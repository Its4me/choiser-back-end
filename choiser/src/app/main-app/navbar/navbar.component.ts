import { UserService } from '../../core/services/user.service';
import { User } from './../../shared/interfaces';
import { AuthCoreService } from './../../core/services/authCore.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  user$: Observable<User>

  constructor(
    private auth: AuthCoreService,
    private userServ: UserService
  ) { }

  ngOnInit() {
    const _id = this.auth.getId()
    this.user$ = this.userServ.getUserFromBack(_id)
  }

}
