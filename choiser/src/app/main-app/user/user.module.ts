import { SharedModule } from 'src/app/shared/shared.module';
import { UserService } from '../../core/services/user.service';
import { PhotoswiperComponent } from './photoswiper/photoswiper.component';
import { UserComponent } from './user.component';
import { FillPipe } from './array-fill.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadPhotoComponent } from './upload-photo/upload-photo.component';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { AvatarPopUpComponent } from './avatar-pop-up/avatar-pop-up.component';

@NgModule({
  declarations: [
    FillPipe,
    UserComponent,
    PhotoswiperComponent,
    UploadPhotoComponent,
    AvatarPopUpComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    SwiperModule
  ],
  exports: [AvatarPopUpComponent],
  entryComponents: [AvatarPopUpComponent]
})
export class UserModule { }
