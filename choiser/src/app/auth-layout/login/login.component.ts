import { HttpErrorResponse } from '@angular/common/http';
import { Material } from '../../shared/classes/material';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { untilDestroyed } from 'ngx-take-until-destroy';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  loader: boolean = false

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  })

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private material: Material
  ) { }

  ngOnInit() {
  }
  ngOnDestroy() { }

  onSubmit() {
    if (this.form.invalid) {
      this.material.openSnackBar('Заполните все поля')
      return;
    }
    this.loader = true
    this.auth.login(this.form.value)
      .pipe(untilDestroyed(this))
      .subscribe(res => {
        this.router.navigate(['choise'])
      },
        (err: HttpErrorResponse )=> {
          if(err.status == 401){
            this.material.openSnackBar('Не верный логин или пароль')
          }else {
            this.material.openSnackBar(err.message)
          }
          this.loader = false
        }
      )
  }

 
}
