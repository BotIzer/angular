import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ReadersComponent } from './components/readers/readers.component';

const routes: Routes = [
  {path: "login", component: LoginComponent},
  {path: "readers", component: ReadersComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
