import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-language-specific-articles',
  templateUrl: './language-specific-articles.component.html',
  styleUrls: ['./language-specific-articles.component.scss']
})
export class LanguageSpecificArticlesComponent implements OnInit {

  list_blogs: Array<any> = [];
  data: any;
  post_link: any;
  constructor(public route: ActivatedRoute, public router: Router) {
    this.data = [];
    this.route.queryParams.subscribe(params => {
      this.data = JSON.parse(params['articles']);
      this.list_blogs = [];
      this.process_data();
    })
  }

  ngOnInit() {
    window.scroll(0,0);
    this.post_link = window.location.origin;
    this.post_link = this.post_link + "/#/home/post/";
  }

  process_data() {
    for (let j in this.data) {
      for (let i = 0; i < this.data[j]['blog_data'].length; i++) {
        if (this.data[j]['blog_data'][i]['name'] == 'image') {
          let format_data = this.data[j]['blog_data'][i]['data'];
          this.data[j]['blog_data'][i]['data'] = 'data:image/' + this.data[j]['blog_data'][i]['file_type'].split('.')[1] + ';base64,' + format_data;
        }
      }
    }
    let count = 0;
    for (let i in this.data) {
      for (let j = 0; j < this.data[i]['blog_data'].length; j++) {
        if (this.data[i]['blog_data'][j]['name'] == 'text') {
          this.data[i]['preview_text'] = this.data[i]['blog_data'][j]['data'];
          this.data[i]['preview_text'] = this.data[i]['preview_text'].replace(/<[^>]*>/g, '');
          this.data[i]['preview_text'] = this.data[i]['preview_text'].replace('&nbsp;', '');
          this.data[i]['preview_text'] = this.data[i]['preview_text'].replace('&ensp;', '');
          this.data[i]['preview_text'] = this.data[i]['preview_text'].replace('&emsp;', '');
          break;
        }
      }
      this.list_blogs.push(this.data[i]);
    }
  }

  postdata(data: any) {
    // localStorage.setItem('data', JSON.stringify(data));
    this.router.navigate(['/home/post', data['uid']]);
  }

}
