import {Component, Input, OnInit} from '@angular/core';
import {Options} from "@angular-slider/ngx-slider";
import {TransactionService} from "../service/transaction.service";
import {Transaction} from "../model/transaction";
import {Chart, registerables} from "chart.js";
import {ExportService} from "../service/export.service";
import Swal from "sweetalert2";
import {Router} from "@angular/router";
import {NgToastService} from "ng-angular-popup";
import {PageEvent} from "@angular/material/paginator";
import {WalletService} from "../service/wallet.service";
import {FormControl, FormGroup} from "@angular/forms";
import {Category} from "../model/category";
import {CategoryService} from "../service/category.service";

Chart.register(...registerables);

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isOpen: boolean = true;
  transactions: Transaction[] = [];
  idWallet: any;
  totalMoneyIncome: any;
  totalMoneyExpense: any;

  constructor(private transactionService: TransactionService,
              private categoryService: CategoryService,
              private exportService: ExportService,
              private walletService: WalletService,
              private router: Router,
              private toast: NgToastService) {
    this.idWallet = localStorage.getItem("ID_WALLET");
  }

  ngOnInit(): void {
    setTimeout(() => {
      // @ts-ignore
      // document.getElementById("defaultOpen").click();
      this.chart();
      this.chart2();
      this.chart3();
      // this.chart4();
      // this.chart5();
    }, 1500)
    setTimeout(() => {
      // @ts-ignore
      document.getElementById("defaultOpen").click();
    }, 2000)
    this.findMaxMin();
    this.showTransaction();
    this.getData6Month();
    this.getData6MonthExpense()
    this.getNameCate();
    this.showExpenseCategoryUpdate();
    this.showIncomeCategoryUpdate();
    this.findAllTransactionsIncome();
    this.findAllTransactionsExpense();
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

  findAllTransactionsIncome(){
    this.transactionService.findAllTransactionsIncome().subscribe((transactions) => {
      this.transactions = transactions;
      this.totalMoneyIncome = this.transactions;
    })
  }

  findAllTransactionsExpense(){
    this.transactionService.findAllTransactionsExpense().subscribe((transactions) => {
      this.transactions = transactions;
      this.totalMoneyExpense = this.transactions;
    })
  }

  showTransaction() {
    this.transactionService.findAll().subscribe((transactions) => {
      this.transactions = transactions;
      this.transactionFile = [];
      this.transactionList();
    })
  }

  // biểu đồ chi
  transactionsSpent: any[] = [];
  labelsSpent: any[] = ['Trống'];
  colorSpent: any[] = ['#d0e1ef'];
  totalRevenueSpent = 0;
  percentMoneySpent: any[] = [100];
  checkIdSpent: any[] = [];
  totalSpent: any[] = [];

  getDataSpent() {
    let pm = 0;
    this.transactionService.findAllByMonth(2).subscribe((transactions) => {
      this.transactionsSpent = transactions;
      if (this.transactionsSpent.length != 0) {
        this.labelsSpent.pop();
        this.colorSpent.shift();
        this.percentMoneySpent.pop();
        for (let i = 0; i < this.transactionsSpent.length; i++) {
          if (!this.checkIdSpent.includes(this.transactionsSpent[i].category.id)) {
            this.labelsSpent.push(this.transactionsSpent[i].category.name);
            this.colorSpent.push(this.transactionsSpent[i].category.color);
            this.checkIdSpent.push(this.transactionsSpent[i].category.id);
            this.totalSpent.push(this.transactionsSpent[i].totalSpent);
          } else {
            for (let j = 0; j < this.checkIdSpent.length; j++) {
              if (this.checkIdSpent[j] == this.transactionsSpent[i].category.id) {
                this.totalSpent[j] += this.transactionsSpent[i].totalSpent;
              }
            }
          }
          this.totalRevenueSpent += this.transactionsSpent[i].totalSpent;
        }
        for (let i = 0; i < this.totalSpent.length; i++) {
          pm = (this.totalSpent[i] / this.totalRevenueSpent) * 100;
          this.percentMoneySpent.push(pm);
        }
      }
    });
  }

  // transactionsSpent5: any[] = [];
  // labelsSpent5: any[] = ['Trống'];
  // colorSpent5: any[] = ['#d0e1ef'];
  // totalRevenueSpent5 = 0;
  // percentMoneySpent5: any[] = [100];
  // checkIdSpent5: any[] = [];
  // totalSpent5: any[] = [];

  // getDataSpent2() {
  //   let pm = 0;
  //   this.transactionService.findAllTrasactionByUser(2).subscribe((transactions) => {
  //     this.transactionsSpent5 = transactions;
  //     if (this.transactionsSpent5.length != 0) {
  //       this.labelsSpent5.pop();
  //       this.colorSpent5.shift();
  //       this.percentMoneySpent5.pop();
  //       for (let i = 0; i < this.transactionsSpent5.length; i++) {
  //         if (!this.checkIdSpent5.includes(this.transactionsSpent5[i].category.id)) {
  //           this.labelsSpent5.push(this.transactionsSpent5[i].category.name);
  //           this.colorSpent5.push(this.transactionsSpent5[i].category.color);
  //           this.checkIdSpent5.push(this.transactionsSpent5[i].category.id);
  //           this.totalSpent5.push(this.transactionsSpent5[i].totalSpent5);
  //         } else {
  //           for (let j = 0; j < this.checkIdSpent5.length; j++) {
  //             if (this.checkIdSpent5[j] == this.transactionsSpent5[i].category.id) {
  //               this.totalSpent5[j] += this.transactionsSpent5[i].totalSpent5;
  //             }
  //           }
  //         }
  //         this.totalRevenueSpent5 += this.transactionsSpent5[i].totalSpent5;
  //       }
  //       for (let i = 0; i < this.totalSpent5.length; i++) {
  //         pm = (this.totalSpent5[i] / this.totalRevenueSpent5) * 100;
  //         this.percentMoneySpent5.push(pm);
  //       }
  //     }
  //   });
  // }


  chart3() {
    this.getDataSpent();
    const ctx = document.getElementById('myChart3');
    // @ts-ignore
    const myChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: this.labelsSpent,
        datasets: [{
          label: 'My First Dataset',
          data: this.percentMoneySpent,
          backgroundColor: this.colorSpent,
          hoverOffset: 4
        }]
      },
    });
  }

  // transactionsCollect4: any[] = [];
  // labelsCollect4: any[] = ['Trống'];
  // colorCollect4: any[] = ['#d0e1ef'];
  // totalRevenueCollect4 = 0;
  // percentMoney4: any[] = [100];
  // checkIdCollect4: any[] = [];
  // totalCollect4: any[] = [];

  // chart4() {
  //   console.log("a4");
  //   this.getDataCollect2();
  //   const ctx = document.getElementById('myChart4');
  //   console.log(ctx)
  //   // @ts-ignore
  //   const myChart4 = new Chart(ctx, {
  //     type: 'doughnut',
  //     data: {
  //       labels: this.labelsCollect4,
  //       datasets: [{
  //         label: 'My First Dataset 4',
  //         data: this.percentMoney4,
  //         backgroundColor: this.colorCollect4,
  //         hoverOffset: 4
  //       }]
  //     },
  //   });
  //   console.log(myChart4)
  // }

  // chart5() {
  //   this.getDataSpent2();
  //   const ctx = document.getElementById('myChart5');
  //   // @ts-ignore
  //   const myChart5 = new Chart(ctx, {
  //     type: 'doughnut',
  //     data: {
  //       labels: this.labelsSpent5,
  //       datasets: [{
  //         label: 'My First Dataset 5',
  //         data: this.percentMoneySpent5,
  //         backgroundColor: this.colorSpent5,
  //         hoverOffset: 4
  //       }]
  //     },
  //   });
  // }



  //biểu đồ thu
  transactionsCollect: any[] = [];
  labelsCollect: any[] = ['Trống'];
  colorCollect: any[] = ['#d0e1ef'];
  totalRevenueCollect = 0;
  percentMoney: any[] = [100];
  checkIdCollect: any[] = [];
  totalCollect: any[] = [];


  getDataCollect() {
    let pm = 0;
    this.transactionService.findAllByMonth(1).subscribe((transactions) => {
      this.transactionsCollect = transactions;
      if (this.transactionsCollect.length != 0) {
        this.labelsCollect.pop();
        this.colorCollect.pop();
        this.percentMoney.pop();
        for (let i = 0; i < this.transactionsCollect.length; i++) {
          if (!this.checkIdCollect.includes(this.transactionsCollect[i].category.id)) {
            this.labelsCollect.push(this.transactionsCollect[i].category.name);
            this.colorCollect.push(this.transactionsCollect[i].category.color);
            this.checkIdCollect.push(this.transactionsCollect[i].category.id);
            this.totalCollect.push(this.transactionsCollect[i].totalSpent);
          } else {
            for (let j = 0; j < this.checkIdCollect.length; j++) {
              if (this.checkIdCollect[j] == this.transactionsCollect[i].category.id) {
                this.totalCollect[j] += this.transactionsCollect[i].totalSpent;
              }
            }
          }
          this.totalRevenueCollect += this.transactionsCollect[i].totalSpent;
        }
        for (let i = 0; i < this.totalCollect.length; i++) {
          pm = (this.totalCollect[i] / this.totalRevenueCollect) * 100;
          this.percentMoney.push(pm);
        }
      }
    });
  }

  // transactionsCollect4: any[] = [];
  // labelsCollect4: any[] = ['Trống'];
  // colorCollect4: any[] = ['#d0e1ef'];
  // totalRevenueCollect4 = 0;
  // percentMoney4: any[] = [100];
  // checkIdCollect4: any[] = [];
  // totalCollect4: any[] = [];

  // getDataCollect2() {
  //   let pm = 0;
  //   this.transactionService.findAllTrasactionByUser(1).subscribe((transactions) => {
  //     this.transactionsCollect4 = transactions;
  //     if (this.transactionsCollect4.length != 0) {
  //       this.labelsCollect4.pop();
  //       this.colorCollect4.pop();
  //       this.percentMoney4.pop();
  //       for (let i = 0; i < this.transactionsCollect4.length; i++) {
  //         if (!this.checkIdCollect4.includes(this.transactionsCollect4[i].category.id)) {
  //           this.labelsCollect4.push(this.transactionsCollect4[i].category.name);
  //           this.colorCollect4.push(this.transactionsCollect4[i].category.color);
  //           this.checkIdCollect4.push(this.transactionsCollect4[i].category.id);
  //           this.totalCollect4.push(this.transactionsCollect4[i].totalSpent);
  //         } else {
  //           for (let j = 0; j < this.checkIdCollect4.length; j++) {
  //             if (this.checkIdCollect4[j] == this.transactionsCollect4[i].category.id) {
  //               this.totalCollect4[j] += this.transactionsCollect4[i].totalSpent;
  //             }
  //           }
  //         }
  //         this.totalRevenueCollect4 += this.transactionsCollect4[i].totalSpent;
  //       }
  //       for (let i = 0; i < this.totalCollect4.length; i++) {
  //         pm = (this.totalCollect4[i] / this.totalRevenueCollect4) * 100;
  //         this.percentMoney4.push(pm);
  //       }
  //     }
  //   });
  // }

  chart() {
    this.getDataCollect();
    const ctx = document.getElementById('myChart');
    // @ts-ignore
    const myChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: this.labelsCollect,
        datasets: [{
          label: 'My First Dataset',
          data: this.percentMoney,
          backgroundColor: this.colorCollect,
          hoverOffset: 4
        }]
      },
    });
  }


  //biểu đồ 6 tháng gần nhất
  transactionsIncomeMonth: any[] = [];
  totalIncome: any[] = [];
  lab: any[] = [];

  getData6Month() {
    let today = new Date();
    this.transactionService.findAllTransactionsIncomeFor6Months().subscribe((transaction) => {
      for (const key in transaction) {
        this.pushTotalIncome(transaction[key]);
      }
      
    })
  }

  pushTotalIncome(transactions: any) {
    this.transactionsIncomeMonth = transactions;
    if (this.transactionsIncomeMonth.length == 0) {
      this.totalIncome.push(0);
    } else if (this.transactionsIncomeMonth.length != 0) {
      let total = 0;
      for (let i = 0; i < this.transactionsIncomeMonth.length; i++) {
        if (this.transactionsIncomeMonth[i].category.status == 1) {
          total += this.transactionsIncomeMonth[i].totalSpent;
        }
      }
      this.totalIncome.push(total);
    }
  }

  transactionsExpenseMonth: any[] = [];
  totalExpense: any[] = [];

  getData6MonthExpense() {
    let today = new Date();
    this.transactionService.findAllTransactionsExpenseFor6Months().subscribe((transaction) => {
      for (const key in transaction) {
        this.pushTotalExpense(transaction[key]);
        this.lab.push('Tháng ' + key)
      }
    })
  }

  pushTotalExpense(transactions: any) {
    this.transactionsExpenseMonth = transactions;
    if (this.transactionsExpenseMonth.length == 0) {
      this.totalExpense.push(0);
    } else if (this.transactionsExpenseMonth.length != 0) {
      let total = 0;
      for (let i = 0; i < this.transactionsExpenseMonth.length; i++) {
        if (this.transactionsExpenseMonth[i].category.status == 2) {
          total += this.transactionsExpenseMonth[i].totalSpent;
        }
      }
      this.totalExpense.push(total);
    }
  }

  chart2() {
    // console.log(this.totalIncome)
    // console.log(this.totalExpense)
    const ctx2 = document.getElementById('myChart2');
    // @ts-ignore
    const myChart2 = new Chart(ctx2, {
        type: 'bar',
        data: {
          labels: this.lab,
          datasets: [{
            label: 'Thu',
            data: this.totalIncome,
            backgroundColor: 'rgb(114,231,217)',
            borderColor: 'rgb(108,231,202)',
            borderWidth: 1
          },
            {
              label: 'Chi',
              data: this.totalExpense,
              backgroundColor: 'rgb(217,122,136)',
              borderColor: 'rgb(225,117,140)',
              borderWidth: 1
            }
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      }
    );
  }


  // exportFile
  transactionFile: any[] = [];
  categoryStatus: any;
  totalFile: any;

  transactionList() {
    for (let i = 0; i < this.transactions.length; i++) {
      if (this.transactions[i].category.status == '1') {
        this.categoryStatus = 'Thu';
      } else if (this.transactions[i].category.status == '2') {
        this.categoryStatus = 'Chi';
      }
      this.transactionFile.push({
        'Số thứ tự': `${i + 1}`,
        'Danh mục chi tiêu': `${this.categoryStatus}`,
        'Tên danh mục chi tiêu': `${this.transactions[i].category.name}`,
        'Tổng tiền': `${this.transactions[i].totalSpent + ' ' + this.transactions[i].wallet.moneyType.name}`,
        'Thời gian': `${this.transactions[i].time}`,
        'Ghi chú': `${this.transactions[i].note}`
      })
    }
  }

  export() {
    let timerInterval: any;
    Swal.fire({
      title: '<h3 style="color: #5ec05e"><img src="https://img.pikbest.com/png-images/20190918/cartoon-snail-loading-loading-gif-animation_2734139.png!bw340" style="width: 100px;height: 100px"><\h3>',
      html: 'Các giao dịch tải trong <b></b> mili giây',
      timer: 1000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
        // @ts-ignore
        const b = Swal.getHtmlContainer().querySelector('b');
        timerInterval = setInterval(() => {
          // @ts-ignore
          b.textContent = Swal.getTimerLeft()
        }, 100)
      },
      willClose: () => {
        clearInterval(timerInterval);
        this.exportService.exportExcel(this.transactionFile, 'danh_sach_giao_dich');
      }
    }).then((result) => {
      /* Read more about handling dismissals below */
      if (result.dismiss === Swal.DismissReason.timer) {
      }
    })
  }

  confirmDelete(id: number) {
      let timerInterval: any;
      Swal.fire({
        title: '<h3 style="color: #5ec05e"><img src="https://img.pikbest.com/png-images/20190918/cartoon-snail-loading-loading-gif-animation_2734139.png!bw340" style="width: 100px;height: 100px"><\h3>',
        html: 'Giao dịch sẽ được xóa trong <b></b> mili giây',
        timer: 1000,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
          // @ts-ignore
          const b = Swal.getHtmlContainer().querySelector('b');
          timerInterval = setInterval(() => {
            // @ts-ignore
            b.textContent = Swal.getTimerLeft()
          }, 100)
        },
        willClose: () => {
          clearInterval(timerInterval);
        }
      }).then((result) => {
        this.transactionService.delete(id).subscribe(() => {
          this.toast.success({detail:"Thông báo", summary: "Xóa giao dich thành công!",duration: 3000,position:'br'})
          setInterval(() => {
            location.reload()
          }, 600)
        })
        /* Read more about handling dismissals below */
        if (result.dismiss === Swal.DismissReason.timer) {
        }
      })
  }

  //ranger
  value: number = 0;
  highValue: number = 0;
  options: Options = {
    floor: 0,
    ceil: 1,
  };
  max = 1000;
  min = 0;
  nameCate: any;
  formSearch = new FormGroup({
    startTime: new FormControl(),
    endTime: new FormControl(),
    status: new FormControl("1")
  })

  getNameCate() {
    this.walletService.findById(this.idWallet).subscribe((wallet) => {
      this.nameCate = wallet.moneyType.name;
    })
  }

  searchWallet() {
    if (this.formSearch.value.startTime == null) {
      this.formSearch.value.startTime = "";
    }
    if (this.formSearch.value.endTime == null) {
      this.formSearch.value.endTime = "";
    }
    this.transactionService.findAllTransactions(String(this.formSearch.value.startTime), String(this.formSearch.value.endTime), Number(this.formSearch.value.status), this.value, this.highValue).subscribe((transactions) => {
      this.transactions = transactions;
      this.transactionFile = [];
      this.transactionList();
    }, error => {
    })
  }

  resetForm() {
    this.value = this.min;
    this.highValue = this.max;
    this.options = {
      floor: this.min,
      ceil: this.max,
    };
    this.formSearch = new FormGroup({
      startTime: new FormControl(),
      endTime: new FormControl(),
      status: new FormControl("1")
    })
    this.showTransaction()
  }

  findMaxMin() {
    this.transactionService.findAll().subscribe((transactions) => {
      this.max = transactions[0].totalSpent;
      this.min = transactions[0].totalSpent;
      for (let i = 0; i < transactions.length; i++) {
        if (transactions[i].totalSpent < this.min) {
          this.min = transactions[i].totalSpent;
        }
        if (transactions[i].totalSpent > this.max) {
          this.max = transactions[i].totalSpent;
        }
      }
      this.value = this.min;
      this.highValue = this.max;
      this.options = {
        floor: this.min,
        ceil: this.max,
      };
    })
  }

  //Edit Transaction
  updateTransactionForm = new FormGroup({
    time: new FormControl(),
    totalSpent: new FormControl(),
    note: new FormControl(),
  })
  
  transaction: any;
  transactionUpdate: any;
  category: any;
  color: string = '#E9E612';
  idCategory: any;
  nameCategory: string = 'Danh mục giao dich';
  expenseCategoriesUpdate: Category[] = [];
  incomeCategoriesUpdate: Category[] = [];

  showExpenseCategoryUpdate() {
    this.categoryService.findByStatus(2).subscribe((categories) => {
      this.expenseCategoriesUpdate = categories;
    }, e => {
      console.log(e);
    })
  }

  showIncomeCategoryUpdate() {
    this.categoryService.findByStatus(1).subscribe((categories) => {
      this.incomeCategoriesUpdate = categories;
    }, e => {
      console.log(e);
    })
  }

  getTransaction(idEdit: any) {
    this.transactionService.findById(idEdit).subscribe(transaction => {
      this.transaction = transaction;
      this.nameCategory = transaction.category.name;
      this.color = transaction.category.color;
      this.idCategory = transaction.category.id;
      this.updateTransactionForm = new FormGroup({
        time: new FormControl(transaction.time),
        totalSpent: new FormControl(transaction.totalSpent),
        note: new FormControl(transaction.note),
      })
    })
  }

  getCategory(id: number) {
    this.categoryService.findById(id).subscribe(category => {
      this.category = category;
      this.nameCategory = category.name;
      this.color = category.color;
      this.idCategory = category.id;
    })
  }

  update() {
    this.transactionUpdate = {
      category: {
        id: this.idCategory,
      },
      time: this.updateTransactionForm.value.time,
      totalSpent: this.updateTransactionForm.value.totalSpent,
      note: this.updateTransactionForm.value.note,
      wallet: {
        id: localStorage.getItem('ID_WALLET')
      }
    }
    console.log(this.transactionUpdate);
    this.transactionService.update(this.transaction.id, this.transactionUpdate).subscribe(() => {
      this.toast.success({detail: "Thông Báo", summary: "Sửa giao dịch thành công", duration: 3000, position: "br"});
      setInterval(() => {
        // location.reload()
      }, 400)
    }, e => {
      this.toast.error({detail: "Thông Báo", summary: "Sửa giao dịch thất bại", duration: 3000, position: "br"});
    })
  }


  //NDH
  updateTransaction() {
    this.transactionUpdate = {
      category: {
        id: this.idCategory,
      },
      time: this.updateTransactionForm.value.time,
      totalSpent: this.updateTransactionForm.value.totalSpent,
      note: this.updateTransactionForm.value.note,
      wallet: {
        id: localStorage.getItem('ID_WALLET')
      }
    }
    console.log(this.transactionUpdate);
    this.transactionService.updateTransaction(this.transaction.id, this.transactionUpdate).subscribe(() => {
      setInterval(() => {
        // location.reload()
      }, 400)
    }, e => {
    })
  }



  //Paging
  p: number = 1;
  total: number = 0;

  pageChangeEvent(event: number) {
    this.p = event;
  }

}
