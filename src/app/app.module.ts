import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HttpModule,Http} from '@angular/http';

import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/HomePage.component';
import { RecipeSummaryComponent } from './components/RecipeSummary.component';

import {RecipeService} from './services/recipe.service';
import {DataService} from './services/data.service';
import {LoginService} from './services/login.service';

const appRoutes: Routes = [
  
          { path: '', redirectTo: 'home', pathMatch: 'full' },
          { path: 'home', component: HomePageComponent},      
];
@NgModule({
  declarations: [
    AppComponent,HomePageComponent,RecipeSummaryComponent
  ],
  imports: [
    HttpModule, BrowserModule, RouterModule.forRoot(appRoutes)
  ],
  providers: [ DataService, RecipeService, LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
