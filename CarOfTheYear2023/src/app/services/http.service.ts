import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ManufacturerModel } from '../models/manufacturer.model';
import { CarModel } from '../models/car.model';
import { VoteModel } from '../models/vote.model';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  getManufacturers(): Observable<ManufacturerModel[]> {
    return this.http.get<ManufacturerModel[]>("https://caroftheyear2023.jedlik.cloud/api/manufacturers");
  }

  getCars(manufacturerId: string): Observable<CarModel[]> {
    return this.http.get<CarModel[]>(`https://caroftheyear2023.jedlik.cloud/api/cars/${manufacturerId}`);
  }

  sendvote(vote: VoteModel): Observable<{message: string}> {
    return this.http.post<{message: string}>('https://caroftheyear2023.jedlik.cloud/api/vote',vote);
  }
}
