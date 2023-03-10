import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../model/user";

const API_URL = environment.apiUrl + "users";
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient : HttpClient) { }

  showAllUser() :Observable<any> {
    return this.httpClient.get(API_URL)
  }

  //thêm
  // adminFindUser(username: any) : Observable<any> {
  //   return this.httpClient.get<any>(environment.apiUrl  + `admin/find-user?username=${username}` )
  // }

  lockUser(id: any, user: User): Observable<User> {
    return this.httpClient.put<User>(environment.apiUrl + `admin/lock-user/${id}` , user);
  }

  unLockUser(id: any, user: User): Observable<User> {
    return this.httpClient.put<User>(environment.apiUrl + `admin/unlock-user/${id}` , user);
  }

  register(user: User): Observable<User> {
    return this.httpClient.post<User>( environment.apiUrl + 'register', user);
  }

  registerSuccess(token: string): Observable<any> {
    return this.httpClient.get<any>(API_URL + '/confirm-account?token=' + token);
  }

  login(user: User): Observable<User> {
    return this.httpClient.post<User>(environment.apiUrl + 'login', user);
  }

  changePass(id: any, user: User): Observable<User> {
    console.log(API_URL + `/users/${id}`);
    return this.httpClient.put<User>(API_URL + `/${id}` , user)
  }

  updateUserProfile(id: any, user: User): Observable<User> {
    return this.httpClient.put<User>(API_URL + `/update-profile/${id}` , user);
  }

  findById(id: any) : Observable<User> {
    return this.httpClient.get<User>(API_URL + `/${id}` )
  }

  findByUsername(username: any) : Observable<any> {
    return this.httpClient.get<any>(API_URL + `/find-by-username/${username}` )
  }
}
