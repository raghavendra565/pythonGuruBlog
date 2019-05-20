import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { HighlightService } from '../highlight.service';


@Component({
  selector: 'app-homechild',
  templateUrl: './homechild.component.html',
  styleUrls: ['./homechild.component.scss']
})
export class HomechildComponent implements OnInit {

  constructor(public highlightService: HighlightService, public http: HttpClient, public router: Router) { }
  data: Array<any> = [];
  list_blogs: Array<any> = [];

  posts = [];
  no_of_posts: number = 10;
  topics = [];
  no_of_topics: number = 10;
  ngOnInit() {
    this.generatePosts();
    this.getBlogs();
  }

  @ViewChild('videoPlayer') videoplayer: ElementRef;

  toggleVideo(event: any) {
    this.videoplayer.nativeElement.play();
  }

  getBlogs() {
    var url = environment.server_url + 'get/blogs';
    let headers = new HttpHeaders();
    const httpOptions = {
      headers: new HttpHeaders({
        'content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      })
    }

    this.http.get(url).subscribe(data => {
      for (let j in data) {
        for (let i = 0; i < data[j]['blog_data'].length; i++) {
          if (data[j]['blog_data'][i]['name'] == 'image') {
            let format_data = data[j]['blog_data'][i]['data'];
            data[j]['blog_data'][i]['data'] = 'data:image/' + data[j]['blog_data'][i]['file_type'].split('.')[1] + ';base64,' + format_data;
          }
        }
        this.list_blogs.push(data[j]);
      }
      let count = 0;
      for (let i in data) {
        // console.log(data[i]['blog_data']);
        for (let j = 0; j < data[i]['blog_data'].length; j++) {
          if (data[i]['blog_data'][j]['name'] == 'image') {
            data[i]['preview_image'] = data[i]['blog_data'][j]['data'];
            count = count + 1;
            break;
          }
        }
        for (let j = 0; j < data[i]['blog_data'].length; j++) {
          if (data[i]['blog_data'][j]['name'] == 'text') {
            data[i]['preview_text'] = data[i]['blog_data'][j]['data'];
            data[i]['preview_text'] = data[i]['preview_text'].replace(/<[^>]*>/g, '');
            data[i]['preview_text'] = data[i]['preview_text'].replace('&nbsp;', '');
            data[i]['preview_text'] = data[i]['preview_text'].replace('&ensp;', '');
            data[i]['preview_text'] = data[i]['preview_text'].replace('&emsp;', '');
            break;
          }
        }
      }
      console.log(this.list_blogs);
      localStorage.setItem('all_blogs_data', JSON.stringify(this.list_blogs));
    },
      error => {
        console.log(error);
      })
  }

  postdata(data: any) {
    localStorage.setItem('data', JSON.stringify(data));
    this.router.navigate(['post']);
  }



  generatePosts() {
    for (let i = 0; i < this.no_of_posts; i++) {
      this.posts.push(i)
    }
    for (let i = 0; i < this.no_of_topics; i++) {
      this.topics.push(i)
    }
  }
  postdetailspage() {
    this.router.navigate(['post']);
  }

}
