import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmPopupComponent } from './user-data/delete-confirm-popup/delete-confirm-popup.component';
import { Material } from './../../shared/classes/material';
import { UserService } from '../../core/services/user.service';
import { FormBuilder, Validators } from '@angular/forms';
import { User } from './../../shared/interfaces';
import { AuthCoreService } from './../../core/services/authCore.service';
import { Component, OnInit, OnDestroy, EventEmitter } from '@angular/core';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit, OnDestroy {

  loading = false

  user: User

  constructor(
    private auth: AuthCoreService,
    private userServ: UserService,
    private router: Router,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    if (Object.keys(this.auth.getUser()).length == 0) {
      const _id = this.auth.getId()
      this.userServ.getUserFromBack(_id)
        .pipe(untilDestroyed(this))
        .subscribe(
          user => {
            this.user = user
            this.auth.setUser(user)
          },
          err => console.log('Ошибка хз что случилось ' + err)
        )
    } else {
      this.user = this.auth.getUser()
    }

  }

  ngOnDestroy() { }

  back(){
    this.router.navigate(['user', this.auth.getId()])
  }
  
}
