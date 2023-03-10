import { AdminHomeComponent } from './admin-home/admin-home.component';
import { NgModule, Component } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {HomePageComponent} from "./user/home-page/home-page.component";
import {AuthGuard} from "./helper/auth-guard";
import {ProfileComponent} from "./profile/profile.component";
import {ChangePasswordComponent} from "./change-password/change-password.component";
import {ShowWalletComponent} from "./wallet/show-wallet/show-wallet.component";
import {ShowCategoryComponent} from "./category/show-category/show-category.component";
import {AddWalletComponent} from "./wallet/add-wallet/add-wallet.component";
import {AddFirstWalletComponent} from "./login/add-first-wallet/add-first-wallet.component";
import { AdminChangePasswordComponent } from './admin-change-password/admin-change-password.component';

const routes: Routes = [{
  path:'home',
  component: HomeComponent
}, {
  path: '',
  component: LoginComponent
},{
  path: 'admin',
  component: AdminHomeComponent
}
, {
  path: 'register',
  component: RegisterComponent
}, {
  path: 'profile',
  component: ProfileComponent
}, {
  path: 'change-password',
  component: ChangePasswordComponent
},{
  path: 'admin-change-password',
  component: AdminChangePasswordComponent
}
, {
  path: 'wallet',
  component: ShowWalletComponent,
  loadChildren: () => import('./wallet/show-wallet/show-wallet-routing.module').then(module => module.ShowWalletRoutingModule)
}, {
  path: 'category',
  component: ShowCategoryComponent,
}, {
  path: 'user',
  canActivate: [AuthGuard],
  component: HomePageComponent,
  loadChildren: () => import('./user/user-routing.module').then(module => module.UserRoutingModule)
}, {
  path: 'create',
  component: AddFirstWalletComponent,
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
