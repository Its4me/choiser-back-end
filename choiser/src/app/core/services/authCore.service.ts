import { Injectable } from '@angular/core';
import { Login } from 'src/app/shared/interfaces';

@Injectable()
export class AuthCoreService {

  auth: Login = {
    token: '',
    _id: ''
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
    this.auth._id = id
  }
  getId(id: string){
    return this.auth._id
  }
}