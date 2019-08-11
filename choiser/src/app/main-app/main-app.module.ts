import { DeleteConfirmPopupComponent } from './edit-user/delete-confirm-popup/delete-confirm-popup.component';
import { AppService } from './app.service';
import { ChoiseModule } from './choise/choise.module';
import { RegionModule } from './../shared/region-choise/region.module';
import { SharedModule } from './../shared/shared.module';
import { EditUserComponent } from './edit-user/edit-user.component';
import { PhotoswiperComponent } from './photoswiper/photoswiper.component';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainAppComponent } from './main-app.component';
import { NavbarModule } from './navbar/navbar.module';
import { UserModule } from './user/user.module';
import { RatingModule } from './rating/rating.module';
import { StepperComponent } from './stepper/stepper.component';


@NgModule({
  declarations: [
    MainAppComponent,
    EditUserComponent,
    StepperComponent,
    PhotoswiperComponent,
    DeleteConfirmPopupComponent
  ],
  imports: [
    CommonModule,
    NavbarModule,
    SharedModule,
    UserModule,
    RegionModule,
    ChoiseModule,
    RatingModule
  ],
  entryComponents: [DeleteConfirmPopupComponent],
  providers: [AppService]
})
export class MainAppModule { }
