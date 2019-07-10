import { SharedModule } from './../shared/shared.module';
import { ChoiseComponent } from './choise/choise.component';
import { UserComponent } from './user/user.component';
import { EditUserComponent } from './edit-user/edit-user.component';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainAppComponent } from './main-app.component';
import { NavbarModule } from './navbar/navbar.module';
import { RatingComponent } from './rating/rating.component';
import { FillPipe } from './user/array-fill.pipe';
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
    UserModule
  ]
})
export class MainAppModule { }
