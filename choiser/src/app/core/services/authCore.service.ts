import { Injectable } from '@angular/core';
import { Login, User } from 'src/app/shared/interfaces';
import { of, Observable, Subject } from 'rxjs';

@Injectable()
export class AuthCoreService {

  user$: Observable<User>

  private auth: Login = {
    token: '',
    userId: ''
  }
  
  private user: User = {}
  private userSubject: Subject<User>

  constructor(
    
  ){
    this.userSubject = new Subject<User>();
    this.user$ = this.userSubject.asObservable();
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
  getId(): string{
    return this.auth.userId
  }

  getUser(): User{
    return Object.assign({},this.user) 
  }
  setUser(user: User){
    this.user = user
    this.userSubject.next(user)
  }
  getUserObservable(): Observable<User>{
    return of (this.user)
  }
}