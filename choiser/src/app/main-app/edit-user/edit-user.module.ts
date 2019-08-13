import { RegionModule } from './../../shared/region-choise/region.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeleteConfirmPopupComponent } from './delete-confirm-popup/delete-confirm-popup.component';
import { EditUserComponent } from './edit-user.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    DeleteConfirmPopupComponent,
    EditUserComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RegionModule
  ],
  entryComponents: [DeleteConfirmPopupComponent],
})
export class EditUserModule { }
