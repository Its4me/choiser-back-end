import { AuthCoreService } from 'src/app/core/services/authCore.service';
import { Material } from 'src/app/shared/classes/material';
import { UserService } from 'src/app/core/services/user.service';
import { User } from './../../../shared/interfaces';
import { Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { untilDestroyed } from 'ngx-take-until-destroy';

@Component({
  selector: 'app-social-data',
  templateUrl: './social-data.component.html',
  styleUrls: ['./social-data.component.scss']
})
export class SocialDataComponent implements OnInit, OnDestroy {

  @Input() user: User

  loading: boolean = false

  form = this.fb.group({
    instagram: [''],
    telegram: [''],
    facebook: [''],
    vk: [''],
    twitter: ['']
  })

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private material: Material,
    private authCore: AuthCoreService
  ) { }

  ngOnInit() {
    if(this.user.social && Object.keys(this.user.social).length > 0){
      this.form.patchValue({
        instagram: this.user.social.instagram,
        telegram: this.user.social.telegram,
        facebook: this.user.social.facebook,
        vk: this.user.social.vk,
        twitter: this.user.social.twitter
      })
    }
  }

  ngOnDestroy(){}

  onSubmit(){
    this.loading= true
    const data: User = {
      social: this.form.value
    }
    
    this.userService.editUser(data)
      .pipe(untilDestroyed(this))
      .subscribe(
        (res: User) => {
          this.authCore.setUser(res)
          this.material.openSnackBar('Сохранено')
          this.loading= false
        },
        err =>  {
          this.material.openSnackBar(err.error.message)
          this.loading = false
        },
       )
  }

}
