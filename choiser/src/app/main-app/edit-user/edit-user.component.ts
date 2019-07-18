import { Material } from 'src/app/shared/classes/material';
import { UserService } from '../../core/services/user.service';
import { FormBuilder } from '@angular/forms';
import { User } from './../../shared/interfaces';
import { AuthCoreService } from './../../core/services/authCore.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { untilDestroyed } from 'ngx-take-until-destroy';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit, OnDestroy {

  user: User = {
    region: '',
    city: ''
  }
  
  loading = false

  form = this.fb.group({
    name: ['user.name'],
    lastname: ['user.lastname'],
    email: ['user.email'],
    nickname: ['user.nickname'],
    sex: ['user.sex']
  })


  constructor(
    private auth: AuthCoreService,
    private fb: FormBuilder,
    private userServ: UserService,
    private material: Material
  ) { }

  ngOnInit() { 
    if (Object.keys(this.auth.getUser()).length == 0) {
      const _id = this.auth.getId()
      this.userServ.getUserFromBack(_id)
        .pipe(untilDestroyed(this))
        .subscribe(
          user => {
            this.initForm(user)
          },
          err => console.log( 'Ошибка хз что случилось ' + err)
        )
    }else {
      this.user = this.auth.getUser()
      this.initForm(this.user)
    }

  }

  ngOnDestroy(){

  }


  initForm(user: User) {
    this.form.patchValue({
      name: user.name,
      lastname: user.lastname,
      email: user.email,
      nickname: user.nickname,
      sex: user.sex
    })
  }

  onSubmit(){
    this.loading = true
    this.userServ.editUser(this.form.value)
      .pipe(untilDestroyed(this))
      .subscribe( 
        res => { 
          this.material.openSnackBar('Сохранено')
          this.loading = false
        }, err => {
          console.log('Ошибка:' + err)
          this.loading = false
        }
      )
  }

}
