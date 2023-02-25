import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-nav-bar',
  templateUrl: './admin-nav-bar.component.html',
  styleUrls: ['./admin-nav-bar.component.css']
})
export class AdminNavBarComponent implements OnInit {

  image: any;
  // wallet: any;
  constructor() { }

  ngOnInit(): void {
    this.image = localStorage.getItem('AVATAR');
    // this.findWallet();
  }

  // findWallet() {
  //   // @ts-ignore
  //   this.walletService.findById(localStorage.getItem('ID_WALLET')).subscribe((wallet) => {
  //     this.wallet = wallet;
  //   })
  // }

}
