export class Choice
{
    public Name:string;
    public Image:string;
    public Data:any;
    public IsNew:boolean;

    public toString = () : string => { return this.Name; }
}
