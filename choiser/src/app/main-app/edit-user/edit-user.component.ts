import { Material } from 'src/app/shared/classes/material';
import { UserService } from '../../core/services/user.service';
import { FormBuilder } from '@angular/forms';
import { User } from './../../shared/interfaces';
import { AuthCoreService } from './../../core/services/authCore.service';
import { Component, OnInit, OnDestroy, EventEmitter } from '@angular/core';
import { untilDestroyed } from 'ngx-take-until-destroy';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit, OnDestroy {

  updateForm: EventEmitter<any> = new EventEmitter();


  location: User = {
    region: '',
    city: ''
  }

  regionErrors = {
    region: false,
    city: false
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
          err => console.log('Ошибка хз что случилось ' + err)
        )
    } else {
      this.location = this.auth.getUser()
      this.initForm(this.location)
    }

  }

  ngOnDestroy() {

  }


  initForm(user: User) {
    this.form.patchValue({
      name: user.name,
      lastname: user.lastname,
      email: user.email,
      nickname: user.nickname,
      sex: user.sex
    })
    this.location.region = user.region
    this.location.city = user.city
    this.updateForm.emit()
  }

  onSubmit() {
    this.loading = true
  
    const newUser = Object.assign({},this.form.value, this.location)
    
    this.userServ.editUser(newUser)
      .pipe(untilDestroyed(this))
      .subscribe(
        res => {
          this.material.openSnackBar('Сохранено')
          this.loading = false
        }, err => {
          console.log('Ошибка:' + err.message)
          this.loading = false
        }
      )
  }

}
