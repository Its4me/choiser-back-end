import { DuelModule } from './duel/duel.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditUserModule } from './edit-user/edit-user.module';
import { ChoiseModule } from './choise/choise.module';
import { RegionModule } from './../shared/region-choise/region.module';
import { SharedModule } from './../shared/shared.module';
import { PhotoswiperComponent } from './photoswiper/photoswiper.component';
import { AppService } from './app.service';

import { MainAppComponent } from './main-app.component';
import { NavbarModule } from './navbar/navbar.module';
import { UserModule } from './user/user.module';
import { RatingModule } from './rating/rating.module';
import { StepperComponent } from './stepper/stepper.component';
import { NotificationModule } from './notification/notification.module';


@NgModule({
  declarations: [
    MainAppComponent,
    StepperComponent,
    PhotoswiperComponent,
  ],
  imports: [
    CommonModule,
    NavbarModule,
    SharedModule,
    UserModule,
    RegionModule,
    ChoiseModule,
    RatingModule,
    EditUserModule,
    NotificationModule,
    DuelModule
  ],

  providers: [AppService]
})
export class MainAppModule { }
