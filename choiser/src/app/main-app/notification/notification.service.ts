import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class NotificationService {

  constructor(
    private http: HttpClient
  ) { }

  getAll(params): Observable<Notification[]>{
    return this.http.get<Notification[]>(
      `api/notifications`,
      {params: params}
    )
  }
  deleteById(id: string){
    return this.http.delete(`api/notifications/${id}`)
  }
  deleteAll(){
    return this.http.delete(`api/notifications`)
  }
}
