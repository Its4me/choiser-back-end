import { User } from './../../shared/interfaces';
import { AuthCoreService } from './../../core/services/authCore.service';
import { Component, OnInit } from '@angular/core';
import { UserCoreService } from 'src/app/core/services/userCore.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  user$: Observable<User>

  constructor(
    private userCore: UserCoreService,
    private auth: AuthCoreService
  ) { }

  ngOnInit() {
    const _id = this.auth.getId()
    this.user$ = this.userCore.getUserFromBack(_id)
  }

}
