import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ChangeDetectorRef, Component, OnInit, HostListener } from '@angular/core';
// import { post } from 'selenium-webdriver/http';
import { Router, NavigationExtras } from '@angular/router';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  post_link: any;
  search_word: any;
  scroll_flag: boolean = false;

  @HostListener('window:scroll', ['$event']) 
    scrollHandler(event) {
      // console.log(window.pageYOffset);
      if(window.pageYOffset > 50){
        this.scroll_flag = true;
      }else {
        this.scroll_flag = false;
      }
    }

  constructor(public router: Router, media: MediaMatcher, changeDetectorRef: ChangeDetectorRef, public http: HttpClient) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
  scroll_fun(event){
    window.scroll(0,0);
  }

  posts = [];
  no_of_posts: number = 10;
  topics = [];
  no_of_topics: number = 5;
  search_data: any = [];
  ngOnInit() {
    this.generatePosts();

    this.post_link = window.location.origin;
    this.post_link = this.post_link + "/#/home/post/";
  }

  home() {
    this.router.navigate(['home']);
  }

  get_by_language(langages: Array<any>) {
    var url = environment.server_url + 'order/language';
    let headers = new HttpHeaders();
    const httpOptions = {
      headers: new HttpHeaders({
        'content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      })
    }
    var body = JSON.stringify({ "languages": langages })
    this.http.post(url, body, httpOptions).subscribe(data => {
      // console.log(data);

      let navigation: NavigationExtras = {
        queryParams: {
          "articles": JSON.stringify(data["data"])
        }, skipLocationChange: true
      };
      this.router.navigate(['/home/postsLanguage'], navigation);

    }, error => {
      console.log(error);
    })
  }

  generatePosts() {
    for (let i = 0; i < this.no_of_posts; i++) {
      this.posts.push(i)
    }
    for (let i = 0; i < this.no_of_topics; i++) {
      this.topics.push(i)
    }
  }

  openLink(link: Number) {
    if (link == 1) {
      window.open("https://www.facebook.com/NarenPythonGuru/");
    }
    else if (link == 2) {
      window.open("https://twitter.com/");
    }
    else if (link == 3) {
      window.open("https://www.linkedin.com/in/narendra-allam/");
    }
    else {
      window.open("https://www.youtube.com/channel/UCcU5R2GNoaNGvfFlkD-0mcw");
    }
  }

  searchWord(event: any) {
    var keyword = event.target.value
    // console.log(keyword.length, keyword)
    if (keyword.length > 4) {
      const httpOptions = {
        headers: new HttpHeaders({
          'content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        })
      }
      var url = environment.server_url + "post/search";
      var body = JSON.stringify({ "keyword": keyword })
      this.http.post(url, body, httpOptions).subscribe(data => {
        this.search_data = data["data"];
        // console.log(data);
      }, error => {
        console.log(error);
      })
    }
  }

}
