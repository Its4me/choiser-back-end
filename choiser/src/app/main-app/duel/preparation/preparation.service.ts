import { AuthCoreService } from './../../../core/services/authCore.service';
import { Injectable } from '@angular/core';
import { User, Photo } from 'src/app/shared/interfaces';

@Injectable()
export class PreparationService {
  
  users: User[] = []
  photos: Photo[][] = [[]]
  index: number
  constructor(
    private authCoreServ: AuthCoreService
  ) { }


  initBattle(user: User){
    this.users[0] = this.authCoreServ.getUser()
    this.users[1] = user
  }
  setIsNew(bool: boolean){
    this.index = bool? 0 : 1
  }

  choisePhoto(photo: Photo){
    this.photos[this.index].push(photo)
  }
  removePhoto(photo: Photo){
    this.photos[this.index] = this.photos[this.index].filter(elem => elem._id != photo._id)
  }
}
