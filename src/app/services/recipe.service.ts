import {DataService} from './data.service';
import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs/Rx';
import {Recipe} from '../models/recipe';

@Injectable()
export class RecipeService 
{
    private key:string = "recipe";
    
    constructor(private _dataService:DataService)
    {
    }

    getRecipes() : Observable<Recipe[]>
    {
        return this._dataService.getList<Recipe>(this.key, false);
    }
}