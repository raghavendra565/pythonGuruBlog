import { Component, OnInit } from '@angular/core';
import { post } from 'selenium-webdriver/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(public router: Router) { }
  posts = [];
  no_of_posts: number = 10;
  topics = [];
  no_of_topics: number = 5;
  ngOnInit() {
    this.generatePosts();
  }

  home(){
    this.router.navigate(['home']);
  }

  generatePosts(){
    for(let i=0; i<this.no_of_posts; i++){
      this.posts.push(i)
    }
    for(let i=0; i<this.no_of_topics; i++){
      this.topics.push(i)
    }
  }
  
}
