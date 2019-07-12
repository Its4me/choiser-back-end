import { UserService } from './../user.service';
import { Photo } from './../../../shared/interfaces';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { untilDestroyed } from 'ngx-take-until-destroy';

@Component({
  selector: 'app-upload-photo',
  templateUrl: './upload-photo.component.html',
  styleUrls: ['./upload-photo.component.scss']
})
export class UploadPhotoComponent implements OnInit, OnDestroy {
  @Input('uploadPhotos') uploadPhotos: Photo[]
  @Input('photoFile') photoFile: File[]

  constructor(
    private user: UserService
  ) { }

  ngOnInit() {
  }

  ngOnDestroy(){}

  delete(i: number) {
    this.photoFile.splice(i,1)
    this.uploadPhotos.splice(i,1)
  }
  save(){
    const data = new FormData()
    this.photoFile.forEach(photo => {
      data.append('photos', photo, photo.name)
    });
    
    this.user.uploadPhoto(data)
      .pipe(untilDestroyed(this))
      .subscribe(res=> console.log(res)
      )

  }
  cancel(){
    this.photoFile.splice(0)
    this.uploadPhotos.splice(0)
  }
}
