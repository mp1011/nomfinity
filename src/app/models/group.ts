export class Group<T> 
{
    public Title:string;
    public Notes:string;
    public Items:T[];

    constructor()
    {
        this.Items = new Array<T>();
    }
}