import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [NavbarComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [NavbarComponent]
})
export class NavbarModule { }
