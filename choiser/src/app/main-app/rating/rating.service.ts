import { User, RatingParams } from 'src/app/shared/interfaces';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable()
export class RatingService {



  constructor(
    private http: HttpClient
  ) { }


  getRegion(): Observable<any> {
    return this.http.get<any>('assets/Ukraine/regions.json').pipe(
      map(regions => regions.areas))
  }

  getUsers(params: any): Observable<User[]> {
    params.skip.toString()
    params.limit.toString()
    
    return this.http.get<User[]>('api/rating', {params: params})
  }
}
