import { Component } from '@angular/core';
import { Message } from 'primeng/api';
import { HttpService } from '../../services/http.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
    login = {
      loginName: '',
      password: ''
    };

    errorMessages: Message[] = [];

    loading = false;

    constructor(private httpservice: HttpService, private router: Router) {

    }

    loginClick(): void {
      this.errorMessages = [];
      if (!this.login.loginName) {
        this.errorMessages.push({
          severity: 'error', summary: 'Hiba', detail: 'Kérem adja meg a felhasználói nevét!'
        })
      }
      if (!this.login.password) {
        this.errorMessages.push({
          severity: 'error', summary: 'Hiba', detail: 'Kérem adja meg a jelszavát!'
        })
      }
      if (this.errorMessages.length == 0) {
        this.loading = true;
        this.httpservice.login(this.login).subscribe({
          next: (result: boolean) => {
            if (result) {
              this.router.navigate(['/'])
            } else {
              this.loading = false
              this.errorMessages = [{
                severity: 'error',
                summary: 'Hiba!',
                detail: "Váratlan hiba: Próbálja újra."
              }]
            }
          },
          error: (err: any) => {
            this.loading = false;
            this.errorMessages = [{
              severity: 'error',
              summary: 'Hiba!',
              detail: err.error?.message ?? err.message
            }]
          }
        })
        //TODO: Backend hivása
      }
    }
  }
