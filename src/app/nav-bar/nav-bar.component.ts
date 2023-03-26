import { Component, OnInit } from '@angular/core';
import { WalletService } from "../service/wallet.service";
import { SideBarComponent } from '../side-bar/side-bar.component';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
  entryComponents: [SideBarComponent]
})
export class NavBarComponent implements OnInit {
  image: any;
  wallet: any;
  constructor(private walletService: WalletService) { }
  // constructor(private walletService: WalletService, private sideBarComponent: SideBarComponent) { }

  ngOnInit(): void {
    this.image = localStorage.getItem('AVATAR');
    this.findWallet();
  }

  findWallet() {
    // @ts-ignore
    this.walletService.findById(localStorage.getItem('ID_WALLET')).subscribe((wallet) => {
      this.wallet = wallet;
    })
  }

  handleToggleSidebar() {
    // this.sideBarComponent.onToggleSidebar();
  }
}
