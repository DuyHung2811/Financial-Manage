import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CommonModule} from "@angular/common";
import {DetailWalletComponent} from "../detail-wallet/detail-wallet.component";

const routes: Routes = [{
  path: ':id',
  component: DetailWalletComponent
}];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class ShowWalletRoutingModule {
}
