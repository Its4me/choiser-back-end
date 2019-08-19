import { SharedModule } from 'src/app/shared/shared.module';

import { UserComponent } from './user.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadPhotoComponent } from './upload-photo/upload-photo.component';
import { AvatarPopUpComponent } from './avatar-pop-up/avatar-pop-up.component';
import { SocialComponent } from './social/social.component';

@NgModule({
  declarations: [
    UserComponent,
    UploadPhotoComponent,
    AvatarPopUpComponent,
    SocialComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [AvatarPopUpComponent],
  entryComponents: [AvatarPopUpComponent]
})
export class UserModule { }
