import { Photo, User } from '../../shared/interfaces';
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

  uploadPhoto(data: FormData): Observable<any>{
    return this.http.post('api/photo', data)
  }
  deletePhoto(id: string): Observable<any>{
    return this.http.delete(`api/photo/${id}`)
  }

  editUser(user: User): Observable<User> {
    return this.http.patch(`api/user`, user)
  }
  editAvatar(data): Observable<User>{
    return this.http.patch<User>('api/user/avatar', data)
  }
  deleteUser(id: string){
    return this.http.delete(`api/user/${id}`)
  }
}
