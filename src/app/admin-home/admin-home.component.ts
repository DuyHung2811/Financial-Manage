import { User } from './../model/user';
import { UserService } from './../service/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {
  user: User | any;
  isOpen: boolean = true;



  constructor(private UserService: UserService,
    private router: Router,
    private toast: NgToastService) {
  }

  ngOnInit(): void {
    this.showListUsers();
  }

  isOpenHtml(id: any) {
    // @ts-ignore
    if (document.getElementById('' + id).hidden) {
      // @ts-ignore
      document.getElementById('' + id).hidden = false;
    } else {
      // @ts-ignore
      document.getElementById('' + id).hidden = true;
    }
  }





  listUsers: User[] = [];

  showListUsers() {
    this.UserService.showAllUser().subscribe((users) => {
      this.listUsers = users;
    }, e => {
      console.log(e);
    })
  }

  confirmLock(id: number) {
    this.user = this.UserService.findById(id);
    this.UserService.lockUser(id, this.user).subscribe(() => {
      this.toast.warning({ detail: "Thông báo", summary: "Đã khoá tài khoản!", duration: 3000, position: 'br' })
      // this.router.navigateByUrl("/admin")
    }, error => {
      console.log(error)
    })
  }

  confirmUnlock(id: number) {
    this.user = this.UserService.findById(id);
    this.UserService.unLockUser(id, this.user).subscribe(() => {
      this.toast.success({ detail: "Thông báo", summary: "Đã mở khoá tài khoản", duration: 3000, position: 'br' })
      // this.router.navigateByUrl("/admin")
    }, error => {
      console.log(error)
    })
  }

  //Paging
  p: number = 1;
  total: number = 0;

  pageChangeEvent(event: number) {
    this.p = event;
  }
}
