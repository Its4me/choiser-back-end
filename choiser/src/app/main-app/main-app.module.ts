import { ChoiseModule } from './choise/choise.module';
import { RegionModule } from './../shared/region-choise/region.module';
import { SharedModule } from './../shared/shared.module';
import { EditUserComponent } from './edit-user/edit-user.component';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainAppComponent } from './main-app.component';
import { NavbarModule } from './navbar/navbar.module';
import { UserModule } from './user/user.module';
import { RatingModule } from './rating/rating.module';


@NgModule({
  declarations: [
    MainAppComponent,
    EditUserComponent
  ],
  imports: [
    CommonModule,
    NavbarModule,
    SharedModule,
    UserModule,
    RegionModule,
    ChoiseModule,
    RatingModule
  ]
})
export class MainAppModule { }
