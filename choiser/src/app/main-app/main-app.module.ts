import { RegionModule } from './../shared/region-choise/region.module';
import { SharedModule } from './../shared/shared.module';
import { ChoiseComponent } from './choise/choise.component';
import { EditUserComponent } from './edit-user/edit-user.component';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainAppComponent } from './main-app.component';
import { NavbarModule } from './navbar/navbar.module';
import { RatingComponent } from './rating/rating.component';
import { UserModule } from './user/user.module';

@NgModule({
  declarations: [
    MainAppComponent,
    EditUserComponent,
    RatingComponent,
    ChoiseComponent,
   
  ],
  imports: [
    CommonModule,
    NavbarModule,
    SharedModule,
    UserModule,
    RegionModule
  ]
})
export class MainAppModule { }
