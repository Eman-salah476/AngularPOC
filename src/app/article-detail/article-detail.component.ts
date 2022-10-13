import { ArticleApiService } from './../Services/article-api.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ArticleService } from './../Services/article.service';
import { Article } from './../article';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.css']
})
export class ArticleDetailComponent implements OnInit {

  Id: number;
  fetchedArticle: Article;
  selectedFile: any;
  articleForm: FormGroup = new FormGroup({
    title: new FormControl('', Validators.required),
    brief: new FormControl('', Validators.required),
    dateFrom: new FormControl('', Validators.required),
    dateTo: new FormControl('', Validators.required),
    image: new FormControl('', Validators.required),
  });
  constructor(private _activatedRoute: ActivatedRoute, private _articleService: ArticleApiService,
    private _router: Router) { }

  ngOnInit(): void {
    //the parameter will be asigned only once to prop after first component call
    // this.Id = parseInt(this._activatedRoute.snapshot.paramMap.get('id'));
    //Each call to the component the parameter will be updated
    this._activatedRoute.paramMap.subscribe(params => {
      this.Id = parseInt(params.get('id'));
    });

    //Fetch article by id
    this._articleService.GetArticle(this.Id).subscribe({
      next: (response) => {
        console.log(response);
        this.fetchedArticle = response;
        this.articleForm.get('title').setValue(this.fetchedArticle.title);
        this.articleForm.get('brief').setValue(this.fetchedArticle.brief);
        this.articleForm.get('dateFrom').setValue(this.fetchedArticle.dateFrom);
        this.articleForm.get('dateTo').setValue(this.fetchedArticle.dateTo);

        console.log(this.articleForm);
      },
      error: (error) => console.log(error)
    });
  }


  OnEdit() {
    console.log("Clicked");
    if (!this.articleForm.valid) {
      return;
    }
    let formValue: Article = this.articleForm.value;

    let formData = new FormData();
    formData.append('title', this.articleForm.get('title').value);
    formData.append('brief', this.articleForm.get('brief').value);
    formData.append('dateFrom', this.articleForm.get('dateFrom').value);
    formData.append('dateTo', this.articleForm.get('dateTo').value);
    formData.append('image', this.selectedFile);

    console.log(formData);
    this._articleService.EditArticle(this.Id, formData).subscribe({
      next: (response) => this._router.navigate(['home']),
      error: (error) => console.log(error)
    });
  }

  OnFileSelect(event) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

}
