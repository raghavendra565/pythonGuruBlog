import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { HomechildModule } from './homechild/homechild.module';


const routes: Routes = [
  {
    path: '', 
    component:HomeComponent, 
    children: [
      {path:'', loadChildren: './homechild/homechild.module#HomechildModule'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
