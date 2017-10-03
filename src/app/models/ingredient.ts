import {Range} from './range';
import {Choice} from './choice';

export class Ingredient
{
    Quantity:Range;
    Unit:Unit;
    Name:string;
    Prep:string;

    constructor()
    {
        this.Quantity = new Range();
        this.Unit = Unit.GetAllUnits()[0];
        this.Name = "";
    }

    getQuantity() : string 
    {
        var ret:string = "";
        
        if(this.Quantity.value != 1 || this.Unit.Name != "Whole")
            ret += this.Quantity.toString();

        if(this.Unit.Name != "Whole")
            ret += " " + this.Unit.ShortName;

        return ret;
    }

    toString() : string 
    {
        var ret:string = "";
        
        if(this.Quantity.value != 1 || this.Unit.Name != "Whole")
            ret += this.Quantity.toString();

        if(this.Unit.Name != "Whole")
            ret += " " + this.Unit.ShortName + " ";

        ret += this.Name;

        if(this.Prep)
            return ret + ", " + this.Prep;
        else
            return ret;
    }   
}

export class Unit 
{
    Name:string;
    ShortName:string="";
    PluralName:string="";

    constructor()
    {
        this.Name="undefined";
        this.ShortName="undefined";
    }

    public static GetName(unit:Unit, amount:number):string 
    {
        if(amount > 1 && unit.PluralName.length>0)
            return unit.PluralName;
        else 
            return unit.ShortName;
    }

    public asChoice():Choice 
    {
        var ret:Choice = new Choice();
        ret.Name=this.ShortName;
        ret.Data=this;
        return ret;
    }

    static GetAllUnits() : Unit[]
    {
        var ret = new Array<Unit>();

        unit = new Unit();
        unit.Name = "Whole";
        unit.ShortName = "";
        ret.push(unit);

        unit = new Unit();
        unit.Name = "Ounce";
        unit.ShortName = "oz";
        ret.push(unit);

        var unit = new Unit();
        unit.Name = "Pound";
        unit.ShortName = "lb";
        ret.push(unit);

        unit = new Unit();
        unit.Name = "Gram";
        unit.ShortName = "g";
        ret.push(unit);

        unit = new Unit();
        unit.Name = "Tablespoon";
        unit.ShortName = "Tb";
        ret.push(unit);
      
        unit = new Unit();
        unit.Name = "Teaspoon";
        unit.ShortName = "tsp";
        ret.push(unit);

        unit = new Unit();
        unit.Name = "Cup";
        unit.ShortName = "cup";        
        unit.PluralName = "cups";
        ret.push(unit);
      
        unit = new Unit();
        unit.Name = "Piece";
        unit.ShortName = "piece";
        unit.PluralName = "pieces";
        ret.push(unit);

        unit = new Unit();
        unit.Name = "Slice";
        unit.ShortName = "slice";
        unit.PluralName = "slices";
        ret.push(unit);

        unit = new Unit();
        unit.Name = "Pinch";
        unit.ShortName = "pinch";
        unit.PluralName = "pinches";
        ret.push(unit);

        return ret;      
    }

    static FillNameFromShortName(unit:Unit) : void 
    {
        var units = Unit.GetAllUnits();
        var match = units.filter(i=>i.ShortName==unit.ShortName)[0];
        unit.Name = match.Name;
        unit.PluralName=match.PluralName;
    }

}