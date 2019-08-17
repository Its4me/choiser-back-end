import { RegionModule } from './../../shared/region-choise/region.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeleteConfirmPopupComponent } from './user-data/delete-confirm-popup/delete-confirm-popup.component';
import { EditUserComponent } from './edit-user.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserDataComponent } from './user-data/user-data.component';
import { SocialDataComponent } from './social-data/social-data.component';

@NgModule({
  declarations: [
    DeleteConfirmPopupComponent,
    EditUserComponent,
    UserDataComponent,
    SocialDataComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RegionModule
  ],
  entryComponents: [DeleteConfirmPopupComponent],
})
export class EditUserModule { }
