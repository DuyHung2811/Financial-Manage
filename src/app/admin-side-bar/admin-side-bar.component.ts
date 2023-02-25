import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-side-bar',
  templateUrl: './admin-side-bar.component.html',
  styleUrls: ['./admin-side-bar.component.css']
})
export class AdminSideBarComponent implements OnInit {

  isLogin = false;
  idUser = localStorage.getItem('ID');
  // idWallet = localStorage.getItem("ID_WALLET")
  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  logout() {
    localStorage.clear();
    this.isLogin = false;
    this.router.navigate(['/']).then();
  }
}
