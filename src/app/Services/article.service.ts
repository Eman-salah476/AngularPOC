import { Article } from './../article';
import { Injectable } from '@angular/core';
import ArticleData from './../Data/Articles.json'
import { Observable, observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  fetchedArticles: Article[] = ArticleData;

  constructor() { }

  //Fetch Data
  GetArticles() {
    return this.fetchedArticles;
  }

  //Add new article
  AddArticle(article: Article) {
    this.fetchedArticles.push(article);
    let obs: Observable<string>;
    return obs;
    // return this._http.post('', article);

  }

  //Delete Article
  Delete(id: number) {
    this.fetchedArticles.forEach((element, index) => {
      if (element.id == id) {
        this.fetchedArticles.splice(index, 1);
        console.log(`Deleted: ${index}`);
      }
    })
  }

  //Edit Article
  Edit(id: number, article: Article) {
    let articleIndex = this.fetchedArticles.findIndex(a => a.id == id);
    this.fetchedArticles[articleIndex] = article;
  }

  //Get one Article
  GetById(id: number) {
    return this.fetchedArticles.find(i => i.id == id);
  }

}
