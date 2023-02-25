import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

const API = 'http://localhost:8080/transactions/';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private httpClient: HttpClient) {
  }

  findAll(): Observable<any> {
    return this.httpClient.get(API + 'find-by-wallet/' + localStorage.getItem('ID_WALLET'));
  }

  findById(id: number): Observable<any> {
    return this.httpClient.get(API + id);
  }

  save(transaction: any): Observable<any> {
    return this.httpClient.post(API + 'create', transaction);
  }

  update(id: number, transaction: any): Observable<any> {
    return this.httpClient.put(API + id, transaction);
  }


  updateTransaction(id: number, transaction: any): Observable<any> {
    return this.httpClient.put(API + `update/${id}`, transaction);
  }



  delete(id: any): Observable<any> {
    return this.httpClient.delete(API + id);
  }

  findAllByMonth(status: any): Observable<any> {
    const id = localStorage.getItem("ID_WALLET");
    return this.httpClient.get(API + `find-all-by-time?status=${status}&id=${id}`);
  }

  findAllTransactionsIncomeFor6Months(): Observable<any> {
    const id = localStorage.getItem("ID_WALLET");
    return this.httpClient.get(API + `find-all-income-6month/${id}`);
  }

  findAllTransactionsExpenseFor6Months(): Observable<any> {
    const id = localStorage.getItem("ID_WALLET");
    return this.httpClient.get(API + `find-all-expense-6month/${id}`);
  }

  findAllTransactions(startTime: any, endTime: any, status: any, from: any, to: any): Observable<any> {
    const id = localStorage.getItem("ID_WALLET");
    return this.httpClient.get(API + `find-all-transaction?startTime=${startTime}&endTime=${endTime}&status=${status}&from=${from}&to=${to}&id=${id}`);
  }
  findAllTransactionsByCategoryID(id: any): Observable<any> {
    return this.httpClient.get(API + 'find-by-category/'+ id);
  }
}
