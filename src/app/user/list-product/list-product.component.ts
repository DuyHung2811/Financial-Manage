import { Component, OnInit } from '@angular/core';
import {UserService} from "../../service/user.service";

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent implements OnInit {

  constructor(private userService : UserService) { }

  ngOnInit(): void {
    this.showAllUser()
  }

  showAllUser() {
    this.userService.showAllUser().subscribe(data => {
      console.log(data)
    }, error => {
      console.log(error)
    })
  }
}
