import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarListComponent } from './components/car-list/car-list.component';
import { VoteComponent } from './components/vote/vote.component';

const routes: Routes = [
  { path:'', component: CarListComponent},
  { path:'vote', component:VoteComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
