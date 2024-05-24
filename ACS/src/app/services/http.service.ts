import { UserModel } from './../models/user-model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ReaderModel } from '../models/reader-model';


@Injectable({
  providedIn: 'root'
})

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  APIUrl = "https://acs.jedlik.cloud";

  userData: UserModel = {
    name: "",
    token: "",
    validTo: ""
  }

  loggedStatusChanged = new EventEmitter();

  constructor(private http: HttpClient) { }

  login(model: {loginName: string, password: string}): Observable<boolean>{
     return this.http.post<UserModel>(`${this.APIUrl}/login`, model).pipe(
        map((result: UserModel) => {
        if (result.token) {
          this.userData = result;
          localStorage.setItem('user', JSON.stringify(this.userData));
          this.loggedStatusChanged.emit();
          return true;
        }
        this.logout();
        return false;
      })
     )
  }

  logout(): void {
    this.userData = {
      name: "",
      token: "",
      validTo: ""
    };
    localStorage.removeItem('user');
    this.loggedStatusChanged.emit();
  }

  checkUserData(): void {
    const u = localStorage.getItem('user');
    if (u) {
      const user = JSON.parse(u);
      if (new Date(user.validTo) > new Date()) {
        this.userData = user;
        this.loggedStatusChanged.emit();
      } else {
        this.logout();
      }
    }
  }

  getReaders(): Observable<ReaderModel[]> {
    return this.http.get<ReaderModel[]>(`${this.APIUrl}/terminal`);
  }

  insertReader(model: ReaderModel): Observable<ReaderModel> {
    return this.http.post<ReaderModel>(`${this.APIUrl}/terminal`, model);
  }

  updateReader(model: ReaderModel): Observable<ReaderModel> {
    return this.http.put<ReaderModel>(`${this.APIUrl}/terminal`, model);

  }

  deleteReader(id: number): Observable<any> {
    // var options = {
    //   Headers: new HttpHeaders({
    //     'Content-Type': 'application/json'
    //   }),
    //   body: model
    // }

    // return this.http.delete<any>(`${this.APIUrl}/terminal/${id}`, options);
    return this.http.delete<any>(`${this.APIUrl}/terminal/${id}`);
  }


}

