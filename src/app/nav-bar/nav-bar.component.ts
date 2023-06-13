import { Component, OnInit, ViewChild, AfterViewInit   } from '@angular/core';
import { WalletService } from "../service/wallet.service";
// import { SideBarComponent } from '../side-bar/side-bar.component';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit{
  // @ViewChild(SideBarComponent) sideBarComponent!: SideBarComponent;
  image: any;
  wallet: any;
  
  constructor(private walletService: WalletService) { }
  // ngAfterViewInit(): void {
  //   if (this.sideBarComponent) {
  //     this.sideBarComponent.onToggleSidebar();
  //   }
  // }

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

  // handleToggleSidebar() {
  //     this.sideBarComponent.onToggleSidebar();
  // }
}
