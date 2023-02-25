import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {TokenDto} from "../model/token-dto";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class OauthService {

  oauthURL = 'http://localhost:8080/oauth/';

  constructor(private httpClient: HttpClient) { }

  public facebook(tokenDto: TokenDto): Observable<TokenDto> {
    return this.httpClient.post<TokenDto>(this.oauthURL + 'facebook', tokenDto);
  }
}

