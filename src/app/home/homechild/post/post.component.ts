import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from './../../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material';
import { HighlightService } from '../../highlight.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  constructor(public highlightService: HighlightService, public http: HttpClient, private snackBar: MatSnackBar) { }

  durationInSeconds = 2;
  commenter_name: String = null;
  commenter_email: String = null;
  comment: String = null;

  posts = [];
  no_of_posts: number = 10;
  topics = [];
  no_of_topics: number = 5;
  data : any;
  all_blogs_data: any;

  ngOnInit() {
    this.generatePosts();
    this.data = JSON.parse(localStorage.getItem('data'));
    this.all_blogs_data = JSON.parse(localStorage.getItem('all_blogs_data'));
  }

  ngAfterViewChecked() {
    this.highlightService.highlightAll();
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

  generatePosts() {
    for (let i = 0; i < this.no_of_posts; i++) {
      this.posts.push(i)
    }
    for (let i = 0; i < this.no_of_topics; i++) {
      this.topics.push(i)
    }
  }

  postComment(data: any) {
    console.log(data);
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
      var body = JSON.stringify({'uid':this.data['uid'], 'comment':this.data['comments'][this.data['comments'].length - 1]});
      console.log(body);
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
