import { AuthCoreService } from './../core/services/authCore.service';
import { User, Login } from './../shared/interfaces';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';



@Injectable()
export class AuthService {

  constructor(
    private http: HttpClient,
    private authCore: AuthCoreService
  ) { }

  login(user: User): Observable<Login> {
    return this.http.post<Login>('/api/auth/login', user).pipe(
      tap(res => { 
        this.authCore.setToken(res.token) 
        this.authCore.setId(res._id) 
        localStorage.setItem('token', res.token)
        localStorage.setItem('_id', res._id)
      })
    )
  }

  register(user: User): Observable<Login> {
    return this.http.post<Login>('/api/auth/register', user).pipe(
      tap(res => { 
        this.authCore.setToken(res.token) 
        this.authCore.setId(res._id) 
        localStorage.setItem('token', res.token)
        localStorage.setItem('_id', res._id)
      })
    )
  }

  any(){
    return this.http.get('api/user/id')
  }
}
