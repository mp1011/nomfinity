import {Component, Input} from '@angular/core';
import {Recipe} from '../models/recipe';

@Component({
    selector: 'RecipeSummary',
    template: ` 
   
    <div>
    i am a recipe {{Recipe.Title}}
    </div>
    
    `
})

export class RecipeSummaryComponent
{
    @Input() Recipe:Recipe = new Recipe();
}