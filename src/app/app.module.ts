import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HttpModule,Http} from '@angular/http';

import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/HomePage.component';
import { RecipeSummaryComponent } from './components/RecipeSummary.component';
import { HeaderComponent } from './components/Header.component';
import { FooterComponent } from './components/Footer.component';
import { SearchComponent } from './components/Search.component';
import {RecipeService} from './services/recipe.service';
import {DataService} from './services/data.service';
import {LoginService} from './services/login.service';
import {ImageService} from './services/image.service';

const appRoutes: Routes = [
  
          { path: '', redirectTo: 'home', pathMatch: 'full' },
          { path: 'home', component: HomePageComponent},      
];
@NgModule({
  declarations: [
    AppComponent,HomePageComponent,RecipeSummaryComponent, HeaderComponent, FooterComponent, SearchComponent
  ],
  imports: [
    HttpModule, BrowserModule, RouterModule.forRoot(appRoutes)
  ],
  providers: [ DataService, RecipeService, LoginService, ImageService],
  schemas: [NO_ERRORS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
