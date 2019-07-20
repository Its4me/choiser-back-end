import { TableComponent } from './table/table.component';
import { RatingComponent } from './rating.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RatingService } from './rating.service';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    RatingComponent,
    TableComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  providers: [RatingService]
})
export class RatingModule { }
