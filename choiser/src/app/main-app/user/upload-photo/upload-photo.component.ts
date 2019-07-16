import { Material } from './../../../shared/classes/material';
import { UserService } from '../../../core/services/user.service';
import { Photo } from './../../../shared/interfaces';
import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { untilDestroyed } from 'ngx-take-until-destroy';

@Component({
  selector: 'app-upload-photo',
  templateUrl: './upload-photo.component.html',
  styleUrls: ['./upload-photo.component.scss']
})
export class UploadPhotoComponent implements OnInit, OnDestroy {
  @Input('uploadPhotos') uploadPhotos: Photo[]
  @Input('photoFile') photoFile: File[]
  @Output() onPhotoLoad = new EventEmitter<any>();

  loader: boolean = false


  constructor(
    private user: UserService
  ) { }

  ngOnInit() {
  }

  ngOnDestroy() { }

  delete(i: number) {
    this.photoFile.splice(i, 1)
    this.uploadPhotos.splice(i, 1)
  }
  save() {
    this.loader = true
    const data = new FormData()
    this.photoFile.forEach(photo => {
      data.append('photos', photo, photo.name)
    });

    this.user.uploadPhoto(data)
      .pipe(untilDestroyed(this))
      .subscribe(res => {
        this.onPhotoLoad.emit(res)
        Material.toast(`Сохранено ${this.uploadPhotos.length} фото`)
        this.photoFile.splice(0)
        this.loader = false
        this.uploadPhotos.splice(0)
      },
        err => {
          this.loader = false
          Material.toast(err.message)
        }
      )

  }
  cancel() {
    this.photoFile.splice(0)
    this.uploadPhotos.splice(0)
  }
}
