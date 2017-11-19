import {Component, Input} from '@angular/core';
import {Recipe} from '../models/recipe';
import {ImageService} from '../services/image.service';

@Component({
    selector: 'RecipeSummary',
    template: ` 
   
    <a class="verticalflex_top" [routerLink]="['Recipe', {name:Recipe.Title}]">
        <h1>{{Recipe.Title}}</h1>
    </a>
    
    <h2>{{Recipe.SubTitle}}</h2>

    <img alt='{{Recipe.Title}}' title='{{Recipe.Title}}' [src]='_imageService.getUploadedImagePath(Recipe.Image)' />
    
    `
})

export class RecipeSummaryComponent
{
    @Input() Recipe:Recipe = new Recipe();

    constructor(private _imageService : ImageService){ }
}