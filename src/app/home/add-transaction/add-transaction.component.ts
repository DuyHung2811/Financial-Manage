import { WalletService } from './../../service/wallet.service';
import { Wallet } from './../../model/wallet';
import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Category} from "../../model/category";
import {TransactionService} from "../../service/transaction.service";
import {CategoryService} from "../../service/category.service";
import {NgToastService} from "ng-angular-popup";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-transaction',
  templateUrl: './add-transaction.component.html',
  styleUrls: ['./add-transaction.component.css']
})
export class AddTransactionComponent implements OnInit {
  wallet: any;
  totalMoney: any;


  transactionForm = new FormGroup({
    time: new FormControl(),
    totalSpent: new FormControl(),
    note: new FormControl(),
  })

  category: any;
  color: string = '#E9E612';
  nameCategory: string = 'Danh mục giao dich';
  expenseCategories: Category[] = [];
  incomeCategories: Category[] = [];
  transaction: any;

  constructor(private transactionService: TransactionService,
              private walletService: WalletService, 
              private categoryService: CategoryService,
              private toast: NgToastService) {
  }

  ngOnInit(): void {
    this.showExpenseCategory();
    this.showIncomeCategory();
  }

  showExpenseCategory() {
    this.categoryService.findByStatus(2).subscribe((categories) => {
      this.expenseCategories = categories;
    }, e => {
      console.log(e);
    })
  }

  showIncomeCategory() {
    this.categoryService.findByStatus(1).subscribe((categories) => {
      this.incomeCategories = categories;
    }, e => {
      console.log(e);
    })
  }

  addTransaction() {
    this.transaction = {
      category: {
        id: this.category.id,
      },
      time: this.transactionForm.value.time,
      totalSpent: this.transactionForm.value.totalSpent,
      note: this.transactionForm.value.note,
      wallet: {
        id: localStorage.getItem('ID_WALLET')
      }
    }
    
    this.transactionService.save(this.transaction).subscribe(() => {
      this.toast.success({detail: "Thông báo", summary: "Thêm giao dịch thành công!", duration: 3000, position: 'br'})
      setInterval(() => {
        location.reload()
      }, 600)
    })
  }

  getCategory(id: number) {
    this.categoryService.findById(id).subscribe(category => {
      this.category = category;
      this.nameCategory = category.name;
      this.color = category.color;
    })
  }


  findWallet() {
    // @ts-ignore
    this.walletService.findById(localStorage.getItem('ID_WALLET')).subscribe((wallet) => {
      this.wallet = wallet;
      console.log("a",this.wallet)
      // this.totalMoney = this.wallet.moneyAmount;
    })
  }
}
