// import { BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomechildRoutingModule } from './homechild-routing.module';
import { PostComponent, PizzaPartyComponent } from './post/post.component';
import { HomechildComponent } from './homechild.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [PostComponent, HomechildComponent, PizzaPartyComponent],
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
