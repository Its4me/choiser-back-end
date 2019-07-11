import { HttpClient } from '@angular/common/http';
import { User } from './../../shared/interfaces';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class UserCoreService {
  user: User

  constructor(
    private http: HttpClient
  ){}

  getUserFromBack(_id: string): Observable<User>{
    return this.http.get<User>(`api/user/${_id}`)
  }

  getCurrentUser(): User{
    return this.user
  }
  getCurrentUserId(): string{
    return this.user._id
  }
} 