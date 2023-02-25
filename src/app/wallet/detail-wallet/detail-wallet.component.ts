import {Component, OnInit} from '@angular/core';
import Swal from "sweetalert2";
import {WalletService} from "../../service/wallet.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl, FormGroup} from "@angular/forms";
import {NgToastService} from "ng-angular-popup";
import {set} from "@angular/fire/database";

@Component({
  selector: 'app-detail-wallet',
  templateUrl: './detail-wallet.component.html',
  styleUrls: ['./detail-wallet.component.css']
})
export class DetailWalletComponent implements OnInit {
  updateForm = new FormGroup({
    name: new FormControl(),
    moneyType: new FormControl(),
  });

  id: number = 0;
  idInUse = Number(localStorage.getItem('ID_WALLET'));
  icon: any;
  isCheck: boolean = false;
  isDisabled: boolean = false;
  wallet: any;
  walletInUse: any;
  walletDelete: any
  walletEdit: any;

  constructor(private walletService: WalletService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private toast: NgToastService) {
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      // @ts-ignore
      this.id = +paramMap.get('id');
      this.getWallet(this.id);
    })
  }

  changeIcon(event: any) {
    this.icon = event.target.src;
  }

  getWallet(id: number) {
    return this.walletService.findById(id).subscribe((wallet) => {
      this.wallet = wallet;
      this.icon = wallet.icon;
      this.updateForm = new FormGroup({
        name: new FormControl(wallet.name),
        moneyType: new FormControl("" + wallet.moneyType.id)
      });
      if (this.wallet.id == localStorage.getItem('ID_WALLET')) {
        this.isCheck = true;
        this.isDisabled = true;
      } else {
        this.isCheck = false;
        this.isDisabled = false;
      }
    })
  }

  alertOnOff(id: number) {
    this.walletService.findById(id).subscribe((wallet) => {
        this.wallet = wallet;
        if (this.wallet.id != localStorage.getItem('ID_WALLET')) {
          Swal.fire({
            title: `<h3 style="color: #b71313">Chuyển ví</h3>`,
            icon: 'question',
            html:
              'Bạn muốn <b>chuyển ví</b>, ví đang sử dụng sẽ bị <b>tắt</b>',
            showCloseButton: true,
            focusConfirm: false,
            confirmButtonText: 'Xác nhận',
          }).then((result) => {
            if (result.isConfirmed) {
              this.walletEdit = {
                name: this.wallet.name,
                moneyType: {
                  id: this.wallet.moneyType.id,
                },
                icon: this.icon,
                moneyAmount: this.wallet.moneyAmount,
                status: 2,
                user: {
                  id: localStorage.getItem('ID')
                }
              }
              console.log(this.walletEdit);
              this.walletService.updateNormal(this.wallet.id, this.walletEdit).subscribe(() => {
                localStorage.removeItem('ID_WALLET');
                localStorage.setItem('ID_WALLET', this.wallet.id);
                location.reload();
              })
            }
          })
          this.walletService.findById(this.idInUse).subscribe((wallet) => {
            this.walletInUse = wallet;
            this.walletService.updateStatus(this.walletInUse.id, this.walletInUse).subscribe(() => {
            })
          })
        }
      }
    )
  }

  confirmDelete() {
    if (this.wallet.id == localStorage.getItem('ID_WALLET')) {
      // Swal.fire({
      //   title: '<h3 style="color: #575656">Bạn muốn xóa ví ?</h3>',
      //   text: 'Ví này hiện đang sử dụng nên không thể xóa !',
      //   icon: 'warning',
      //   confirmButtonText: 'Xác nhận',
      // })
      Swal.fire({
        icon: 'warning',
        text: 'Ví này hiện đang sử dụng nên không thể xóa !',
      })
      
    } else {
      let timerInterval: any;
      Swal.fire({
        title: '<h3 style="color: #5ec05e"><img src="https://img.pikbest.com/png-images/20190918/cartoon-snail-loading-loading-gif-animation_2734139.png!bw340" style="width: 100px;height: 100px"><\h3>',
        html: 'Ví sẽ được xóa trong <b></b> mili giây',
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
        this.walletDelete = {
          name: this.wallet.name,
          moneyType: {
            id: this.wallet.moneyType.id,
          },
          icon: this.wallet.icon,
          moneyAmount: this.wallet.moneyAmount,
          status: this.wallet.status,
          user: {
            id: localStorage.getItem('ID')
          }
        }
        this.walletService.delete(this.wallet.id, this.walletDelete).subscribe(() => {
          this.toast.success({detail: 'Thông báo!', summary: "Xóa ví thành công!",duration: 3000,position:'br'});
          setInterval(() => {
            location.reload()
          },180)
        })
      })
    }
  }

  updateWallet() {
    this.walletEdit = {
      name: this.updateForm.value.name,
      moneyType: {
        id: this.updateForm.value.moneyType,
      },
      icon: this.icon,
      moneyAmount: this.wallet.moneyAmount,
      status: this.wallet.status,
      user: {
        id: localStorage.getItem('ID')
      }
    }
    console.log(this.walletEdit);
    this.walletService.update(this.id, this.walletEdit).subscribe(() => {
      this.toast.success({detail: "Thông báo", summary: "Sửa ví thành công!", duration: 3000, position: 'br'});
      setInterval(() => {
        location.reload()
      },180)
    }, (error) => {
      this.toast.error({detail: "Thông báo", summary: "Sửa ví thất bại!", duration: 3000, position: 'br'});
      setInterval(() => {
        location.reload()
      },180)
    })
  }
}
