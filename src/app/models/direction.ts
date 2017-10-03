export class Direction
{
    text:string;

    toString():string
    {
        return this.text;
    }

    fromJSON(json:any):any
    {
        this.text = json.text;
        return this;
    }
}