import { PreparationComponent } from './main-app/duel/preparation/preparation.component';
import { AuthGuard } from './core/classes/auth.guard';
import { UserComponent } from './main-app/user/user.component';
import { ChoiseComponent } from './main-app/choise/choise.component';
import { MainAppComponent } from './main-app/main-app.component';
import { LoginComponent } from './auth-layout/login/login.component';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './auth-layout/register/register.component';
import { RatingComponent } from './main-app/rating/rating.component';
import { EditUserComponent } from './main-app/edit-user/edit-user.component';
import { NotificationComponent } from './main-app/notification/notification.component';

const routes: Routes = [
  {
    path: '', component: MainAppComponent, canActivate: [AuthGuard] ,children: [
      { path: '', pathMatch: 'full', redirectTo: 'choise' },
      { path: 'choise', component: ChoiseComponent, },
      { path: 'rating', component: RatingComponent, },
      { path: 'user/:id', component: UserComponent, },
      { path: 'edit/user', component: EditUserComponent, },
      { path: 'notification', component: NotificationComponent, },
      { path: 'duel/preparation/:id', component: PreparationComponent, }
    ]
  }, 
  {
    path: '', component: AuthLayoutComponent, children: [
      { path: '', pathMatch: 'full', redirectTo: 'login' },
      { path: 'login', component: LoginComponent, },
      { path: 'register', component: RegisterComponent, }
    ]
  }
  
]; 

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
