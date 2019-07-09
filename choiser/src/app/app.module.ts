import { MainAppModule } from './main-app/main-app.module';
import { AuthModule } from './auth-layout/auth.module';
import { CoreModule } from './core/core.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    CoreModule,
    MainAppModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
