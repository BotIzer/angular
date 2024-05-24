import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarModel } from 'src/app/models/car.model';
import { ManufacturerModel } from 'src/app/models/manufacturer.model';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})
export class CarListComponent implements OnInit {

  manufacturers: ManufacturerModel[] = [];
  cars: CarModel[] = [];

  constructor(
    private httpService: HttpService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.httpService.getManufacturers().subscribe({
      next: (response: ManufacturerModel[]) => this.manufacturers = response,
      error: (err) => {
        console.log(err);
        this.manufacturers = [{id:0, name:'Sikertelen lekérdezés...'}];
      }
    })
    this.getCars('');
  }
  
  manufacturerSelect(event: any): void {
    this.getCars(event.target.value)
  }

  getCars(manufacturerId: string): void {
    this.httpService.getCars(manufacturerId).subscribe({
      next: (response) => this.cars = response,
      error: (err) => {
        console.log(err);
      }
    })
  }

  vote(carId: number) {
    this.router.navigate(['vote'], {queryParams: {carId: carId}});
  }

}
