import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class RegionService {

  constructor(
    private http: HttpClient
  ) { }

  getRegion(): Observable<any> {
    return this.http.get('assets/Ukraine/regions.json')
  }

  getCities(id: string): Observable<any> {
    let fileName = ''

    switch (id) {
      case '2200': fileName = 'sumy'
        break;
      case '2121': fileName = 'vinnytsia'
        break;
      case '2123': fileName = 'volyn'
        break;
      case '2126': fileName = 'dnipropetrovsk'
        break;
      case '2134': fileName = 'donetsk'
        break;
      case '2147': fileName = 'zhytomyr'
        break;
      case '2152': fileName = 'transcarpathian'
        break;
      case '2155': fileName = 'zaporozhye'
        break;
      case '2160': fileName = 'ivano-Frankivsk'
        break;
      case '2164': fileName = 'kiev'
        break;
      case '2169': fileName = 'kirovograd'
        break;
      case '2173': fileName = 'lugansk'
        break;
      case '2180': fileName = 'lviv'
        break;
      case '2185': fileName = 'nikolaev'
        break;
      case '2188': fileName = 'odessa'
        break;
      case '2193': fileName = 'poltava'
        break;
      case '2198': fileName = 'rivne'
        break;
      case '2204': fileName = 'ternopil'
        break;
      case '2206': fileName = 'kharkov'
        break;
      case '2209': fileName = 'kherson'
        break;
      case '2212': fileName = 'khmelnitsky'
        break;
      case '2216': fileName = 'cherkasy'
        break;
      case '2220': fileName = 'chernihiv'
        break;
      case '2224': fileName = 'chernivtsi'
        break;
    }

    return this.http.get(`assets/Ukraine/${fileName}.json`)
  }
}