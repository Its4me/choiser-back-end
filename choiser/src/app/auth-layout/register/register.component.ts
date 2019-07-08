import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    nickname: ['', [Validators.required, Validators.minLength(2)]],
  })

  constructor(private fb: FormBuilder) { 
    
  }

  ngOnInit() {
  }

  onSubmit(){
    if(this.form.invalid){
      // вывести что нужно заполнить поля
      return;
    }
    
  }

}
