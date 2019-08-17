import { DeleteConfirmPopupComponent } from './delete-confirm-popup/delete-confirm-popup.component';
import { Material } from 'src/app/shared/classes/material';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthCoreService } from 'src/app/core/services/authCore.service';
import { Component, OnInit, EventEmitter, Input } from '@angular/core';
import { User } from 'src/app/shared/interfaces';
import { UserService } from 'src/app/core/services/user.service';
import { untilDestroyed } from 'ngx-take-until-destroy';

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.scss']
})
export class UserDataComponent implements OnInit {

  @Input() user: User

  updateForm: EventEmitter<any> = new EventEmitter()

  loading = false

  location: User = {
    region: '',
    city: ''
  }

  regionErrors = {
    region: false,
    city: false
  }

  form = this.fb.group({
    name: ['user.name'],
    lastname: ['user.lastname'],
    email: ['user.email', [Validators.required, Validators.email]],
    nickname: ['user.nickname', [Validators.required, Validators.minLength(2)]],
    sex: ['user.sex']
  })



  constructor(
    private auth: AuthCoreService,
    private fb: FormBuilder,
    private userServ: UserService,
    public dialog: MatDialog,
    private material: Material
  ) { }

  ngOnInit() {
    this.initForm(this.user)
  }

  ngOnDestroy() { }

  onSubmit() {
    if(this.form.invalid || this.regionErrors.region) {return}

    this.loading = true
  
    const newUser = Object.assign({},this.form.value, this.location)
    
    this.userServ.editUser(newUser)
      .pipe(untilDestroyed(this))
      .subscribe(
        res => {
          this.auth.setUser(res)
          this.material.openSnackBar('Сохранено')
          this.loading = false
        }, err => {
          this.material.openSnackBar(err.error.message)
          this.loading = false
        }
      )
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
  
  deleteAccount(){
    const dialogRef = this.dialog.open(DeleteConfirmPopupComponent, { 
      autoFocus: true,
      data: this.auth.getUser()
    })
    
  }

}
