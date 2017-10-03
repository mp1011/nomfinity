export class Range 
{
    public min:number=0;
    public max:number=0;

    public get value():number
    {
        if(this.min != this.max)
            return undefined;
        else 
            return this.min;
    }

    public set value(theValue:number)
    {
        if(theValue != undefined)
        {
            this.min=theValue;
            this.max=theValue;
        }
    }

     fromJSON(json:any):any
     {
        this.value=json.value;
        if(json.min) this.min = json.min;
        if(json.max) this.max= json.max;
        return this;
     }

     static Equals(r1:Range, r2:Range):Boolean
     {
         return r1.min==r2.min && r1.max==r2.max;
     }
     
     static IsNullOrEmpty(r:Range):boolean
     {
         if(!r)
             return true;

        if(!r.min && !r.max)
            return true;

        return false;
     }
     static Add(first:Range, second:Range):Range
     {
         var sum : Range = new Range();
         sum.min = first.min + second.min;
         sum.max = first.max + second.max;
         return sum;
     }

      static Multiply(first:Range, second:Range):Range
     {
         var product : Range = new Range();
         product.min = first.min * second.min;
         product.max = first.max * second.max;
         return product;
     }

       static Divide(first:Range, second:Range):Range
     {
         var product : Range = new Range();
         product.min = first.min / second.max;
         product.max = first.max / second.min;
         return product;
     }
    static DivideBy(first:Range, second:number):Range
     {
         var product : Range = new Range();
         product.min = first.min / second;
         product.max = first.max / second;
         return product;
     }

     static MultiplyBy(first:Range, second:number):Range
     {
         var product : Range = new Range();
         product.min = first.min * second;
         product.max = first.max * second;
         return product;
     }
}