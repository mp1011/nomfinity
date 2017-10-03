import {Range} from './range';
import {Unit} from "../models/ingredient"
/*import * as moment from 'moment';*/


export class IngredientNutrition
{
    ID:number;
    IngredientNames:string[];    
    Calories:NutritionCount;
    GramsProtein:NutritionCount;
    GramsCarbs:NutritionCount;
    GramsFat:NutritionCount;
    MgSodium:NutritionCount;

    constructor()
    {
        this.IngredientNames= new Array<string>();
        this.Calories=new NutritionCount(); this.Calories.NutritionType="Calories";
        this.GramsProtein=new NutritionCount(); this.GramsProtein.NutritionType="Grams Protein";
        this.GramsCarbs=new NutritionCount(); this.GramsCarbs.NutritionType="Grams Carbs";
        this.GramsFat=new NutritionCount(); this.GramsFat.NutritionType="Grams Fat";
        this.MgSodium=new NutritionCount(); this.MgSodium.NutritionType="Mg Sodium";
    }

    public static GetAllNutritionCounts(data:IngredientNutrition) : NutritionCount[]
    {
        var ret = new Array();        
        ret.push(data.Calories);
        ret.push(data.GramsCarbs);
        ret.push(data.GramsFat);
        ret.push(data.GramsProtein);
        ret.push(data.MgSodium);
        return ret;      
    }
}

export class NutritionCount
{
    NutritionType:string;
    PerOz:Range;
    PerGram:Range;
    PerPound:Range;
    PerUnit:Range;
    PerTablespoon:Range;
    PerTeaspoon:Range;
    PerCup:Range;
    PerSlice:Range;
    PerPiece:Range;
    PerPinch:Range;

    constructor()
    {
        this.NutritionType = "";
        this.PerOz= new Range();
        this.PerGram= new Range();
        this.PerPound= new Range();
        this.PerUnit= new Range();
        this.PerTablespoon= new Range();
        this.PerTeaspoon= new Range();
        this.PerCup= new Range();     
        this.PerSlice=new Range();
        this.PerPiece=new Range();   
        this.PerPinch=new Range();
    }
}

export class RecipeNutrition
{
    CaloriesPerServing:Range;
    GramsProteinPerServing:Range;
    GramsCarbsPerServing:Range;
    GramsFatPerServing:Range;
    MgSodiumPerServing:Range;

     constructor()
    {
        this.CaloriesPerServing=new Range();
        this.GramsProteinPerServing=new Range();
        this.GramsCarbsPerServing=new Range();
        this.GramsFatPerServing=new Range();
        this.MgSodiumPerServing=new Range();  
    }
}
