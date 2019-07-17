import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class RegionService {

  region: string

  constructor(
    private http: HttpClient
  ){}
  
  getRegion(): Observable<any>{
    return this.http.get('assets/Ukraine/regions.json')
  }


}