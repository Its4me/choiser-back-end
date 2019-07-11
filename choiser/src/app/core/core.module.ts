import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthCoreService } from './services/authCore.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './classes/token.interceptor';
import { AuthGuard } from './classes/auth.guard';
import { UserCoreService } from './services/userCore.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    AuthCoreService,
    AuthGuard,
    UserCoreService,
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: TokenInterceptor
    }
  ]
})
export class CoreModule { }
