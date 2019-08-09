import { Injectable } from '@angular/core';
import { Observable,  Subject } from 'rxjs';

@Injectable()
export class AppService {

  openNavbar: Subject<boolean>
  navbar$: Observable<boolean>

  constructor() { 
    this.openNavbar = new Subject<boolean>()
    this.navbar$ = this.openNavbar.asObservable()
  }

  toggle(){
    this.openNavbar.next(true)
  }

}
