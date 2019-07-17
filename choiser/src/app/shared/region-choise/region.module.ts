import { SharedModule } from 'src/app/shared/shared.module';
import { RegionChoiseComponent } from './region-choise.component';
import { RegionService } from './region.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [RegionChoiseComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [RegionChoiseComponent],
  providers: [RegionService]
})
export class RegionModule { }
