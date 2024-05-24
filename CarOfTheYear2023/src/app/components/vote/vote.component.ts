import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CarModel } from 'src/app/models/car.model';
import { VoteModel } from 'src/app/models/vote.model';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.css']
})
export class VoteComponent implements OnInit{

  cars: CarModel[] = [];
  errorMessage: string = '';
  vote: VoteModel = {
    carId: undefined,
    email: '',
    comment: '',
    tos: false
  };
  selectEnabled = true;

  constructor(
    private httpService: HttpService,
    private activatedRoute: ActivatedRoute,
    private route: Router
  ) { }

  ngOnInit() {
    this.httpService.getCars('').subscribe({
      next: (result: CarModel[]) => {
        this.cars = result;
        this.activatedRoute.queryParams.subscribe({
          next: (parameters) => {
            const carId = parameters['carId'];
            if (carId) {
              this.vote.carId = carId;
              this.selectEnabled = false;
            }
          }
        });
      },
      error: (err) => {
        console.log(err);
        this.errorMessage = err.message;
      }
    })
  }

  submit() {
    this.errorMessage = "";
    if(!this.vote.carId) {
      this.errorMessage = 'Please select a car!'
      return;
    }
    if(!this.vote.email) {
      this.errorMessage = 'Please add your e-mail address!'
      return;
    }
    if (!this.vote.tos) {
      this.errorMessage = 'Please accept the terms of services!'
      return;
    }

    this.httpService.sendvote(this.vote).subscribe({
      next: (result: {message: string}) => {
        alert('Thank you for your vote!');
        // this.route.navigateByUrl('https://www.youtube.com/watch?v=dQw4w9WgXcQ')
        window.location.href = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = err.error?.message ?? err.message;
      }
    })
  }
}
