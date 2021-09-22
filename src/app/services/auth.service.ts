import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {JwtHelperService} from '@auth0/angular-jwt';
import {Observable, throwError} from 'rxjs';
import {TokenJWT} from '../token-jwt';

const LOGIN_API = 'http://localhost:8000/api/login_check';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) { }

  login(username: string, password: string): Observable<any> {

    console.log( username + ' ' + password);

    return this.http.post<TokenJWT>(LOGIN_API , {
      username,
      password
    }, httpOptions)
    .pipe(map((response) => {
      if (response){

        window.localStorage.setItem('access_token', response.token);
        let jwt = this.jwtHelper.decodeToken(response.token);
        console.log(jwt);
      }
    }),
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    return throwError(error);
  }

  // register(username: string, email: string, password: string): Observable<any> {
  //   return this.http.post(AUTH_API + 'signup', {
  //     username,
  //     email,
  //     password
  //   }, httpOptions);
  // }

}
