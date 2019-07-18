import { SharedModule } from 'src/app/shared/shared.module';
import { UserService } from '../../core/services/user.service';
import { PhotoswiperComponent } from './photoswiper/photoswiper.component';
import { UserComponent } from './user.component';
import { FillPipe } from './array-fill.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadPhotoComponent } from './upload-photo/upload-photo.component';
import { SwiperModule } from 'ngx-swiper-wrapper';

@NgModule({
  declarations: [
    FillPipe,
    UserComponent,
    PhotoswiperComponent,
    UploadPhotoComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    SwiperModule
  ]
})
export class UserModule { }
