import { Injectable } from '@angular/core';
import { Observable,  Subject, BehaviorSubject } from 'rxjs';

@Injectable()
export class AppService {
  
  navbar$: Observable<boolean>
  private openNavbar: Subject<boolean>
  private bigPhoto = new BehaviorSubject(null)
  
  constructor() { 
    this.openNavbar = new Subject<boolean>()
    this.navbar$ = this.openNavbar.asObservable()
  }

  toggle(){
    this.openNavbar.next(true)
  }
  openBigPhoto(photos): void {
    this.bigPhoto.next(photos)
  };
  getBigPhoto(): Observable<any>{
    return this.bigPhoto
  }
  setBigPhoto(any){
    this.bigPhoto.next(any)
  }

}
