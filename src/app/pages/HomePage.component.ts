import {Component} from '@angular/core';
import {RecipeSummaryComponent} from '../components/RecipeSummary.component';
import {RecipeService} from '../services/recipe.service';
import {Recipe} from '../models/recipe';

@Component({
    template: ` 
   
    <div>
    i am the home page    
    <RecipeSummary *ngFor='let recipe of Recipes' [Recipe]='recipe' >    
    </RecipeSummary>
    </div>
    
    `
})

export class HomePageComponent
{
    public Recipes : Recipe[] = new Array();

    constructor(private _recipeService : RecipeService)
    {
        _recipeService.getRecipes().subscribe(r=> this.Recipes= r);
    }
}