
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { ChoiseComponent } from './choise.component';
import { SharedModule } from '../../shared/shared.module';
import { ChoisePhotoComponent } from './choise-photo/choise-photo.component';
import { ChoiseService } from './choise.service';

@NgModule({
  declarations: [
    ChoiseComponent,
    ChoisePhotoComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  providers: [ChoiseService]
})
export class ChoiseModule { }
