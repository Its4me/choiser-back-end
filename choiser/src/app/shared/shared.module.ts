import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule }   from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoaderComponent } from './loader/loader.component';

@NgModule({
  declarations: [LoaderComponent],
  imports: [
    CommonModule
  ],
  exports: [
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    LoaderComponent
  ]
})
export class SharedModule { }
