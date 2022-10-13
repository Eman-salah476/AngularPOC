import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ArticleDetailComponent } from './article-detail/article-detail.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { CreateArticleComponent } from './create-article/create-article.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'',redirectTo:'home', pathMatch:'full' },
  {path:'home',component:HomeComponent,title:'Home'},
  {path:'create', component:CreateArticleComponent,title:'Create'},
  {path:'article/:id', component:ArticleDetailComponent,title:'Details'},
  {path:'login', component:LoginComponent,title:'logIn'},
  {path:'register', component:RegisterComponent,title:'Register'},

  { path: '**', component: NotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
