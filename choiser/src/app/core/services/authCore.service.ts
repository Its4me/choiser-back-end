import { Injectable } from '@angular/core';
import { Login, User } from 'src/app/shared/interfaces';

@Injectable()
export class AuthCoreService {

  private auth: Login = {
    token: '',
    userId: ''
  }
  private user: User = {}


  getToken(): string {
    return this.auth.token
  }

  setToken(token: string) {
    this.auth.token = token
  }

  setId(id: string) {
    this.auth.userId = id
  }
  getId(): string{
    return this.auth.userId
  }

  getUser(): User{
    return this.user
  }
  setUser(user: User){
    this.user = user
  }
}