import { Article } from './../article';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ArticleApiService {

  Base_URL: string = "http://localhost:5000/api/Article/";
  constructor(private _http: HttpClient) { }

  //Get All Articles
  GetAllArticles() {
    return this._http.get<Article[]>(this.Base_URL);
  }

  //Get Article By Id
  GetArticle(id: number) {
    return this._http.get<Article>(this.Base_URL + id);
  }

  //Post Article
  AddArticle(formData: FormData) {
    return this._http.post(this.Base_URL, formData);
  }

  //Edit Article
  EditArticle(id: number, formData: FormData) {
    return this._http.put(this.Base_URL + id, formData);
  }

  //Delete Article
  DeleteArticle(id: number) {
    return this._http.delete(this.Base_URL + id);
  }

  //Get Article By pagination
  GetArticleByPagination(index: number): Observable<any> {
    return this._http.get(this.Base_URL + 'page/' + index);
  }

  //Get Article By pagination and search
  GetArticles(index: number, searchText: string): Observable<any> {
    return this._http.get(this.Base_URL + 'search/' + index + '/' + searchText);
  }


}
