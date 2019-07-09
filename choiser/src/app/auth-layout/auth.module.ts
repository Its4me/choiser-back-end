import { AuthCoreService } from './../core/services/authCore.service';
import { AuthLayoutComponent } from './auth-layout.component';
import { AuthService } from './auth.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    AuthLayoutComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    AuthLayoutComponent,
    LoginComponent, 
    RegisterComponent
  ],
  providers: [AuthService]
})
export class AuthModule { }
