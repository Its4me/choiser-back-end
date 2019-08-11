import { SharedModule } from 'src/app/shared/shared.module';

import { UserComponent } from './user.component';
import { FillPipe } from './array-fill.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadPhotoComponent } from './upload-photo/upload-photo.component';
import { AvatarPopUpComponent } from './avatar-pop-up/avatar-pop-up.component';

@NgModule({
  declarations: [
    FillPipe,
    UserComponent,
    UploadPhotoComponent,
    AvatarPopUpComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [AvatarPopUpComponent],
  entryComponents: [AvatarPopUpComponent]
})
export class UserModule { }
