import { ArticleApiService } from './../Services/article-api.service';
import { Article } from './../article';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  articles: Article[] = [];
  currentIndex: number;
  pagesNumber: number[] = [];
  searchText: string = '';
  searchText2: string = '';

  constructor(private _service: ArticleApiService, private _domSanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.FetchArticles(1);
  }

  //Get Articles
  FetchArticles(index: number) {
    this._service.GetArticles(index, this.searchText2).subscribe({
      next: (result) => {
        this.articles = result.articles;
        this.currentIndex = result.index;
        this.pagesNumber = Array.from({ length: result.pageNumbers }, (_, i) => i + 1);
        console.log(this.pagesNumber);
      },
      error: (error) => console.log(error),
      complete: () => console.log("Completed")
    });

  }

  //Search By condition
  SearchData() {
    console.log(this.searchText2);
    if (this.searchText2.length >= 3 || this.searchText2 == '') {
      this.FetchArticles(1);
    }
  }

  //Delte Article
  DeleteArticle(id: number) {
    this._service.DeleteArticle(id).subscribe({
      next: (result) => console.log(result),
      error: (error) => console.log(error)
    });
  }

  //Sanitizer image path
  TransformURl(URL: string) {
    return this._domSanitizer.bypassSecurityTrustResourceUrl(URL);
  }

}
