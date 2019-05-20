import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomechildComponent } from './homechild.component';
import { PostComponent } from './post/post.component';

const routes: Routes = [
  {path:'', component: HomechildComponent},
  {path:'post', component: PostComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomechildRoutingModule { }
