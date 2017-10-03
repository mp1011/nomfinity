import {Group} from "./group";
export class Technique 
{
    ID:number;
    Name:string; 
    Image:string;
    Lines : Group<TechniqueLine>;  

    constructor()
    {
        this.Image = "noimage.png";
        this.Lines = new Group<TechniqueLine>();
    }
}

export class TechniqueLine
{
    Text:string;
    IsWarning:boolean;
}

