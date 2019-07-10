import { PhotoswiperComponent } from './photoswiper/photoswiper.component';
import { UserComponent } from './user.component';
import { FillPipe } from './array-fill.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    FillPipe,
    UserComponent,
    PhotoswiperComponent
  ],
  imports: [
    CommonModule
  ]
})
export class UserModule { }
