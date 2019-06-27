// import { BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomechildRoutingModule } from './homechild-routing.module';
import { PostComponent, PizzaPartyComponent } from './post/post.component';
import { HomechildComponent } from './homechild.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NarentraningsComponent } from './narentranings/narentranings.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { PythondocsComponent } from './pythondocs/pythondocs.component';
import { LanguageSpecificArticlesComponent } from './language-specific-articles/language-specific-articles.component';
import { VideosComponent } from './videos/videos.component';
import { GalleryComponent } from './gallery/gallery.component';

@NgModule({
  declarations: [PostComponent, HomechildComponent, PizzaPartyComponent, NarentraningsComponent, AboutusComponent, PythondocsComponent, LanguageSpecificArticlesComponent, VideosComponent, GalleryComponent],
  imports: [
    CommonModule,
    HomechildRoutingModule,
    SharedModule  
  ],
  entryComponents: [
    PizzaPartyComponent
  ]
})
export class HomechildModule { }
