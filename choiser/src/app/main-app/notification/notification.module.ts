import { NotificationService } from './notification.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationComponent } from './notification.component';
import { SuperLikeComponent } from './super-like/super-like.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    NotificationComponent, 
    SuperLikeComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  providers: [NotificationService]
})
export class NotificationModule { }
