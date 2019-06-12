import { LanguageSpecificArticlesComponent } from './language-specific-articles/language-specific-articles.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomechildComponent } from './homechild.component';
import { PostComponent } from './post/post.component';
import { NarentraningsComponent } from './narentranings/narentranings.component';
import { PythondocsComponent } from './pythondocs/pythondocs.component';

const routes: Routes = [
  { path: '', component: HomechildComponent },
  { path: 'post/:id', component: PostComponent },
  { path: 'courses', component: NarentraningsComponent },
  { path: 'about', component: AboutusComponent },
  { path: 'pydocs', component: PythondocsComponent },
  { path: 'postsLanguage', component: LanguageSpecificArticlesComponent },
  { path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomechildRoutingModule { }
