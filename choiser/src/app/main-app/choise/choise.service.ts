import { HttpClient } from '@angular/common/http';
import { Photo } from './../../shared/interfaces';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ChoiseService {

  photos: Photo[] = []

  constructor(
    private http: HttpClient
  ) { }

  fetch(): Observable<{ photos: Photo[] }> {
    return this.http.get<{ photos: Photo[] }>('api/voting').pipe(
      map(photo => {
        this.photos = photo.photos
        return photo
      })
    )
  }


  vote(photoWin: Photo, superLike: boolean): Observable<any> {
    
    const userLose = this.photos[0]._id == photoWin._id? this.photos[1] : this.photos[0]
   
    const result = {
      idWin: photoWin.userId,
      idPhotoWin: photoWin._id,
      idLose: userLose.userId,
      idPhotoLose: userLose._id
    }
    if(!superLike){
      return this.http.post('api/voting', result)
    }else{
      return this.http.post('api/voting/SuperLike', result)
    }
  }
}