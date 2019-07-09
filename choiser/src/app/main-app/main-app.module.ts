import { SharedModule } from './../shared/shared.module';
import { ChoiseComponent } from './choise/choise.component';
import { UserComponent } from './user/user.component';
import { EditUserComponent } from './edit-user/edit-user.component';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainAppComponent } from './main-app.component';
import { NavbarModule } from './navbar/navbar.module';
import { RatingComponent } from './rating/rating.component';

@NgModule({
  declarations: [
    MainAppComponent,
    EditUserComponent,
    RatingComponent,
    UserComponent,
    ChoiseComponent
  ],
  imports: [
    CommonModule,
    NavbarModule,
    SharedModule
  ]
})
export class MainAppModule { }
