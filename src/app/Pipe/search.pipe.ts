import { Article } from './../article';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(articles:Article[], text: string): Article[] {
    return articles.filter((article)=>article.title.toLowerCase().includes(text.toLowerCase()));
  }

}
