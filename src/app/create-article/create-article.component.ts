import { ArticleApiService } from './../Services/article-api.service';
import { ArticleService } from './../Services/article.service';
import { Article } from './../article';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.css']
})
export class CreateArticleComponent implements OnInit {

  articleForm: FormGroup;
  selectedFile: any;
  constructor(private _articleService: ArticleService, private _router:Router, private _service:ArticleApiService) { }

  ngOnInit(): void {
    this.articleForm = new FormGroup({
      title: new FormControl('', Validators.required),
      brief: new FormControl('', Validators.required),
      dateFrom: new FormControl('', Validators.required),
      dateTo: new FormControl('', Validators.required),
      image: new FormControl(null, Validators.required)
    });
  }


  OnSubmit() {
    console.log(this.articleForm);

    if (!this.articleForm.valid) {
      return;
    }
    let formValue: Article = this.articleForm.value;
    this._articleService.AddArticle(formValue).subscribe({
      next:() => this._router.navigate(['home']),
      error:(error)=> console.log(error),
      complete:()=> console.log("complete")
    });
  }

  OnFormSubmit() {
    console.log(this.articleForm);
    if (!this.articleForm.valid) {
      return;
    }
    let formData = new FormData();
    formData.append('title', this.articleForm.get('title').value);
    formData.append('brief', this.articleForm.get('brief').value);
    formData.append('dateFrom', this.articleForm.get('dateFrom').value);
    formData.append('dateTo', this.articleForm.get('dateTo').value);
    formData.append('image', this.selectedFile);

    this._service.AddArticle(formData).subscribe({
      next:(result) => this._router.navigate(['home']),
      error:(error)=> console.log(error)
    })

  }

  OnFileSelect(event) {

    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
      console.log(this.selectedFile);
    }
  }

}
