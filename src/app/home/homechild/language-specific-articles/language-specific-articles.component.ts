import { environment } from './../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-language-specific-articles',
  templateUrl: './language-specific-articles.component.html',
  styleUrls: ['./language-specific-articles.component.scss']
})
export class LanguageSpecificArticlesComponent implements OnInit {

  list_blogs: Array<any> = [];
  most_popular: Array<any> = [];
  data: any;
  post_link: any;
  constructor(public route: ActivatedRoute, public router: Router, public http: HttpClient) {
    this.data = [];
    this.route.queryParams.subscribe(params => {
      this.data = JSON.parse(params['articles']);
      for (var i in this.data){
          this.data[i]['preview_text'] = this.data[i]['preview_text'].replace(/<[^>]*>/g, '');
          this.data[i]['preview_text'] = this.data[i]['preview_text'].replace('&nbsp;', '');
          this.data[i]['preview_text'] = this.data[i]['preview_text'].replace('&ensp;', '');
          this.data[i]['preview_text'] = this.data[i]['preview_text'].replace('&emsp;', '');
      }
      this.list_blogs = this.data;
    })
  }

  ngOnInit() {
    window.scroll(0,0);
    this.post_link = window.location.origin;
    this.post_link = this.post_link + "/#/home/post/";

    var url1 = environment.server_url + 'get/popular';
    this.http.get(url1).subscribe(data => {
      for (let i in data) {
        data[i]['preview_text'] = data[i]['preview_text'].replace(/<[^>]*>/g, '');
        data[i]['preview_text'] = data[i]['preview_text'].replace('&nbsp;', '');
        data[i]['preview_text'] = data[i]['preview_text'].replace('&ensp;', '');
        data[i]['preview_text'] = data[i]['preview_text'].replace('&emsp;', '');
        this.most_popular.push(data[i]);
      }
    }, error => {
      console.debug(error)
    })
  }

  postdata(data: any) {
    this.router.navigate(['/home/post', data['uid']]);
  }

}

// process_data() {
//   for (let j in this.data) {
//     for (let i = 0; i < this.data[j]['blog_data'].length; i++) {
//       if (this.data[j]['blog_data'][i]['name'] == 'image') {
//         let format_data = this.data[j]['blog_data'][i]['data'];
//         this.data[j]['blog_data'][i]['data'] = 'data:image/' + this.data[j]['blog_data'][i]['file_type'].split('.')[1] + ';base64,' + format_data;
//       }
//     }
//   }
//   let count = 0;
//   for (let i in this.data) {
//     for (let j = 0; j < this.data[i]['blog_data'].length; j++) {
//       if (this.data[i]['blog_data'][j]['name'] == 'text') {
//         this.data[i]['preview_text'] = this.data[i]['blog_data'][j]['data'];
//         this.data[i]['preview_text'] = this.data[i]['preview_text'].replace(/<[^>]*>/g, '');
//         this.data[i]['preview_text'] = this.data[i]['preview_text'].replace('&nbsp;', '');
//         this.data[i]['preview_text'] = this.data[i]['preview_text'].replace('&ensp;', '');
//         this.data[i]['preview_text'] = this.data[i]['preview_text'].replace('&emsp;', '');
//         break;
//       }
//     }
//     this.list_blogs.push(this.data[i]);
//   }
// }

