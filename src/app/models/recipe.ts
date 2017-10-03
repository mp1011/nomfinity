import {Ingredient} from "./ingredient";
import {Technique} from "./technique";
import {Group} from "./group";
import {Direction} from "./direction";
import {Choice} from './choice';
import {Range} from './range';

export class Recipe 
{
    ID:number=0;
    Title:string="";
    SubTitle:string="";
    Image:string="";

    Servings:Range=new Range();
    CaloriesPerServing:Range=new Range();
    ReadyIn:string="";
    Description:string="";
    
    Techniques: Group<Technique>;
    Ingredients: Group<Ingredient>[];
    Directions: Group<Direction>[];
   
    PublishStatus: PublishStatus = PublishStatus.Draft();
    LastUpdated :Date = new Date();
    
    constructor()
    {
        this.Ingredients = new Array<Group<Ingredient>>();
        this.Directions = new Array<Group<Direction>>();
        
        this.Techniques = new Group<Technique>();
        this.Techniques.Title="Techniques Used";
       
        this.ReadyIn = "1 hour";
        var ing = new Group<Ingredient>();
        ing.Title = "Ingredients";
        this.Ingredients.push(ing);

        this.Image = "noimage.png";

        var dir = new Group<Direction>();
        dir.Title = "Directions";
        this.Directions.push(dir);

        this.Servings = new Range();
        this.Servings.min=4;
        this.Servings.max=4;

        this.PublishStatus = new PublishStatus();
    }

    Summarize():string 
    {
        var ret:string = this.Title + " : ";

        var ingredients = new Array();

        for(let ingGroup of this.Ingredients)
        {
             for(let ing of ingGroup.Items)
             {
                 ingredients.push(ing.Name);
             }
        }

        ret += "(" + ingredients.join(", ") + ")";
        return ret;
    }
}

export class PublishStatus
{
    public Published:boolean=false;
    public LastPublishUpdate:Date;
    public Deleted:boolean=false;

    public asChoice() : Choice 
    {
        var ret:Choice = new Choice();

        if(this.Deleted)
            ret.Name= "Trash";
        else if(this.Published)
            ret.Name = "Published";
        else 
            ret.Name= "Draft";

        ret.Data=this;

        return ret;
    }

    public static Draft() : PublishStatus
    {
        var ret = new PublishStatus();
        return ret;
    }

    public static Published() : PublishStatus
    {
        var ret = new PublishStatus();
        ret.Published=true;
        return ret;
    }

     public static Trash() : PublishStatus
    {
        var ret = new PublishStatus();
        ret.Deleted=true;
        return ret;
    }
}
