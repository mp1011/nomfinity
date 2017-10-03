export class SaveWrapper<T>
{
    ID:number;
    Title:string;
    Data:T;
    Updated:Date;
    
    constructor(id:number,title:string,updated:Date,data:T)
    {
        this.ID=id;
        this.Updated=updated;
        this.Data=data;
        this.Title=title;

        if(this.ID == undefined)
            this.ID = 0;
    }
}