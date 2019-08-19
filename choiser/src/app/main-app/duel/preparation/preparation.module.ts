import { SharedModule } from 'src/app/shared/shared.module';
import { PreparationService } from './preparation.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SliderComponent } from './slider/slider.component';
import { ChoisedPhotoComponent } from './choised-photo/choised-photo.component';
import { PreparationComponent } from './preparation.component';

@NgModule({
  declarations: [
    PreparationComponent, 
    SliderComponent, 
    ChoisedPhotoComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  providers: [PreparationService]
})
export class PreparationModule { }
