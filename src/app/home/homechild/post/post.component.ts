import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from './../../../../environments/environment';
import { Component, OnInit, ViewEncapsulation} from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { HighlightService } from '../../highlight.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PostComponent implements OnInit {

  constructor(public highlightService: HighlightService,
    public http: HttpClient,
    private snackBar: MatSnackBar,
    public router: Router,
    public route: ActivatedRoute
  ) { }

  durationInSeconds = 2;
  commenter_name: String = null;
  commenter_email: String = null;
  comment: String = null;

  most_popular: any = [];
  posts = [];
  no_of_posts: number = 10;
  topics = [];
  no_of_topics: number = 5;
  data: any;
  all_blogs_data: any;
  uid:any;
  post_link : any;
  ngOnInit() {
    window.scroll(0,0);
    this.generatePosts();
    // this.data = JSON.parse(localStorage.getItem('data'));
    // this.all_blogs_data = JSON.parse(localStorage.getItem('all_blogs_data'));
    // console.log(this.all_blogs_data);
    this.post_link = window.location.origin;
    this.post_link = this.post_link + "/#/home/post/";

    this.route.paramMap.subscribe(data=>{
      // console.log(data.get("id"));
      this.uid = data.get("id");
      this.getArticle();
    });
  }

  getArticle(){
    const httpOptions = {
      headers: new HttpHeaders({
        'content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      })
    }
    var url = environment.server_url + 'get/blog_by_id';
    var body = JSON.stringify({ 'uid': this.uid});
    this.http.post(url, body, httpOptions).subscribe(data => {
      // console.log(data);
      this.data = data["data"];
      for(let i = 0; i<this.data["blog_data"].length; i++){
        if(this.data["blog_data"][i]['name'] == 'image'){
          let format_data = this.data['blog_data'][i]['data'];
          this.data['blog_data'][i]['data'] = 'data:image/' + this.data['blog_data'][i]['file_type'].split('.')[1] + ';base64,' + format_data;
        }
      }
      var articles = data["most_popular"];
      for (let j in articles) {
        for (let i = 0; i < articles[j]['blog_data'].length; i++) {
          if (articles[j]['blog_data'][i]['name'] == 'image') {
            let format_data = articles[j]['blog_data'][i]['data'];
            articles[j]['blog_data'][i]['data'] = 'data:image/' + articles[j]['blog_data'][i]['file_type'].split('.')[1] + ';base64,' + format_data;
            // console.log(articles[j]['blog_data'][i]['data']);
          }
        }
        this.most_popular.push(articles[j]);
      }
      this.update_clicks();
      // console.log(this.most_popular);

    }, error => {
      this.router.navigate(['/home']);
      console.log(error);
    })
  }

  ngAfterViewChecked() {
    this.highlightService.highlightAll();
  }

  update_clicks() {
    var url = environment.server_url + 'update/clicks';
    const httpOptions = {
      headers: new HttpHeaders({
        'content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      })
    }
    var body = JSON.stringify({ 'uid': this.data['uid'] });
    this.http.post(url, body, httpOptions).subscribe(data => {
      // console.log(data);
      try {
        this.data["clicks"] = data["clicks"];
      } catch{
        console.log(data);
      }
    }, error => {
      console.log(error)
    })
  }

  dataURItoBlob(dataURI) {
    const byteString = window.atob(dataURI);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], { type: 'image/png' });
    return blob;
  }

  copyMessage(val: string) {
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    this.openSnackBar();
  }

  openSnackBar() {
    this.snackBar.openFromComponent(PizzaPartyComponent, {
      duration: this.durationInSeconds * 1000,
    });
  }

  postdata(data: any) {
    this.router.navigate(['/home/post', data['uid']]);
    // localStorage.setItem('data', JSON.stringify(data));
    // this.ngOnInit();
  }

  generatePosts() {
    for (let i = 0; i < this.no_of_posts; i++) {
      this.posts.push(i)
    }
    for (let i = 0; i < this.no_of_topics; i++) {
      this.topics.push(i)
    }
  }

  postComment(data: any) {
    // console.log(data);
    if (this.comment != null) {
      if (this.commenter_name != null) {
        this.data['comments'].push({ 'comment': this.comment, 'name': this.commenter_name, 'email': this.commenter_email, 'commented_date': new Date() });
      }
      else {
        this.data['comments'].push({ 'comment': this.comment, 'name': 'Anonymous', 'email': this.commenter_email, 'commented_date': new Date() });
      }
      var url = environment.server_url + 'update/comment';
      const httpOptions = {
        headers: new HttpHeaders({
          'content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        })
      }
      var body = JSON.stringify({ 'uid': this.data['uid'], 'comment': this.data['comments'][this.data['comments'].length - 1] });
      // console.log(body);
      this.http.post(url, body, httpOptions).subscribe(data => {
        console.log(data);
      }, error => {
        console.log(error);
      })
    }
  }

}


@Component({
  selector: 'snack-bar-component-example-snack',
  templateUrl: 'snack-bar-component-example-snack.html',
  styles: [`
    .example-pizza-party {
      color: hotpink;
    }
  `],
})
export class PizzaPartyComponent { }

// this.most_popular = this.all_blogs_data.map(x => Object.assign({}, x));
      
// this.most_popular.sort(function (a, b) {
//   return b.clicks - a.clicks
// })
