import { Injectable } from '@angular/core';
import { Login } from 'src/app/shared/interfaces';

@Injectable()
export class AuthCoreService {

  auth: Login = {
    token: '',
    userId: ''
  }


  isLogined(): boolean {
    return this.auth.token != ''
  }

  getToken(): string {
    return this.auth.token
  }

  setToken(token: string) {
    this.auth.token = token
  }

  setId(id: string) {
    this.auth.userId = id
  }
  getId(){
    return this.auth.userId
  }
}