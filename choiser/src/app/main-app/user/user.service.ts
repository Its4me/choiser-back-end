import { Photo, User } from './../../shared/interfaces';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class UserService {

  user: User

  constructor(
    private http: HttpClient
  ){}

  getUserPhotos(_id: string): Observable<Photo[]>{
    return this.http.get<Photo[]>(`api/photo/${_id}`)
  }
  getUserFromBack(_id: string): Observable<User>{
    return this.http.get<User>(`api/user/${_id}`)
  }


}
