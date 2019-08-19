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

  formulaStar(likes, views): number {
    const percent = likes * 100 / views
    switch (true) {
      case (percent < 20): return 1
      case (percent < 40): return 2
      case (percent < 55): return 3
      case (percent < 70): return 4
      case (percent >= 70): return 5
    }
  }
}
