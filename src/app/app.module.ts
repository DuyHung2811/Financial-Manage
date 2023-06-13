import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HomePageComponent} from './user/home-page/home-page.component';
import {ListProductComponent} from './user/list-product/list-product.component';
import {JwtInterceptor} from "./helper/jwt-interceptor";
import {ErrorInterceptor} from "./helper/error-interceptor";
import { SideBarComponent } from './side-bar/side-bar.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ProfileComponent } from './profile/profile.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import {NgToastModule} from "ng-angular-popup";
import { ShowWalletComponent } from './wallet/show-wallet/show-wallet.component';
import { AddWalletComponent } from './wallet/add-wallet/add-wallet.component';
import { ShowCategoryComponent } from './category/show-category/show-category.component';
import {AngularFireStorageModule} from "@angular/fire/compat/storage";
import {AngularFireModule} from "@angular/fire/compat";
import {environment} from "../environments/environment";
import { AddCategoryComponent } from './category/add-category/add-category.component';
import { DetailWalletComponent } from './wallet/detail-wallet/detail-wallet.component';
import {NgxSliderModule} from "@angular-slider/ngx-slider";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatInputModule} from "@angular/material/input";
import {MatNativeDateModule} from "@angular/material/core";
import { AddTransactionComponent } from './home/add-transaction/add-transaction.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatCardModule} from "@angular/material/card";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatButtonModule} from "@angular/material/button";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {NgxPaginationModule} from "ngx-pagination";
import {MatIconModule} from "@angular/material/icon";
import {MatRadioModule} from "@angular/material/radio";
import { AddFirstWalletComponent } from './login/add-first-wallet/add-first-wallet.component';



//social-login

import {
  GoogleLoginProvider,
  FacebookLoginProvider
} from '@abacritt/angularx-social-login';
import { SocialLoginComponent } from './social-login/social-login.component';
import {SocialLoginModule, SocialAuthServiceConfig} from "@abacritt/angularx-social-login";
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminSideBarComponent } from './admin-side-bar/admin-side-bar.component';
import { AdminNavBarComponent } from './admin-nav-bar/admin-nav-bar.component';
import { AdminChangePasswordComponent } from './admin-change-password/admin-change-password.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    HomePageComponent,
    ListProductComponent,
    SideBarComponent,
    NavBarComponent,
    ProfileComponent,
    ChangePasswordComponent,
    ShowWalletComponent,
    AddWalletComponent,
    ShowCategoryComponent,
    AddCategoryComponent,
    DetailWalletComponent,
    AddTransactionComponent,
    AddFirstWalletComponent,
    SocialLoginComponent,
    AdminHomeComponent,
    AdminSideBarComponent,
    AdminNavBarComponent,
    AdminChangePasswordComponent,
  ],
  imports: [
    MatInputModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatRadioModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatPaginatorModule,
    NgxPaginationModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgToastModule,
    ReactiveFormsModule,
    FormsModule,
    AngularFireStorageModule,
    AngularFireModule.initializeApp(environment.firebaseConfig, "cloud"),
    NgxSliderModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    NgxPaginationModule,
    MatPaginatorModule,
    SocialLoginModule
  ],
 
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor, multi: true
    }, {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor, multi: true
    },{
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '503653920031-kj2bqusrbsu9qi3g16d12p91gmut1h79.apps.googleusercontent.com'
            )
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('537877904691106')
          }
        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
