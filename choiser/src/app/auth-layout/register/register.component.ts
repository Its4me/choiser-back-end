import { Material } from '../../shared/classes/material';
import { Router } from '@angular/router';
import { AuthService } from './../auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { untilDestroyed } from 'ngx-take-until-destroy';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {

  loader: boolean = false


  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    nickname: ['', [Validators.required, Validators.minLength(2)]],
  })

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {

  }

  ngOnInit() {
  }
  ngOnDestroy() {

  }

  onSubmit() {

    if (this.form.invalid) {
      Material.toast('Заполните все поля')
      return;
    }
    this.loader = true
    this.auth.register(this.form.value)
      .pipe(untilDestroyed(this))
      .subscribe(res => {
        this.router.navigate(['choise'])
      },
        err => {
          Material.toast(err.message)
          this.loader = false
        }
      )

  }

}
