import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions,Headers} from '@angular/http';
import {Observable, Subject} from 'rxjs/Rx';
import {LoginService} from './login.service';
import {SaveWrapper} from '../models/SaveWrapper';
import {Recipe} from '../models/recipe';

@Injectable()
export class DataService
{ 
    private host:string = "http://www.nomfinity.com";

    private Data : { [key: string]: any; } = { };  
    private DataLoadedSubjects  : { [key: string]: any; } = { };
    
    constructor(private _http: Http, private _loginService : LoginService)
    {
         this.DataLoadedSubjects["recipe"] = new Subject<Recipe>();    
    }
    
    isDataLoaded(key:string):boolean
    {
        return this.getLoadedData(key) != null;
    }

    advertiseChange(key:string):void
    {
        if(this.isDataLoaded(key))
            this.getSubject(key).next(this.getLoadedData(key));
    }

    getSubject<T>(key:string): Subject<T>
    {
        return this.DataLoadedSubjects[key];
    }

    onDataChanged(key:string) : Observable<any>
    {
        return this.getSubject(key).asObservable();
    }

    save<T>(key:string, data:T, id:number, name:string) : Observable<SaveWrapper<T>>
    {
        return this.save2<T>(key,new SaveWrapper<T>(id,name,new Date(),data));
    }

    save2<T>(key:string, data : SaveWrapper<T>) : Observable<SaveWrapper<T>>
    {
        var authToken = this._loginService.LoginToken;

       var options = new RequestOptions({ headers: new Headers({
            "content-type":"text/json","token":authToken})});
 
        var dis = this;
         return this._http.post(this.host + "/php/db.php?type=" + key + "&name=" + encodeURIComponent(data.Title) + "&id=" + data.ID, JSON.stringify(data.Data),options)
          .map(rsp=>{

                var id:number = parseInt(rsp.text());
                if(!isNaN(id))                
                    data.ID = id;
                return data;
          })
          .do(data=>
            {
                var list = dis.getOrCreateLoadedData<T>(key);
                list[data.Title] = this.toSaveWrapper(data);
                //console.log("Saved " + key + " " + data.ID);
            } );
    }


    getLoadedData<T>(key:string): Array<T>
    {
          var loadedData = this.Data[key];
          if(!loadedData)
              return null;
              
          return loadedData;
    }

    getOrCreateLoadedData<T>(key:string) : Array<T>
    {
        var loadedData = this.getLoadedData<T>(key);
        if(loadedData == null)
        {
            loadedData = new Array<T>();
            this.Data[key] = loadedData;
        }

        return loadedData;
    }

    deleteRecord(key:string, id:number) : Observable<any>
    {
        var authToken = this._loginService.LoginToken;

        var options = new RequestOptions({ headers: new Headers({
            "content-type":"text/json","token":authToken})});
 
        return this._http.delete(this.host + "/service/db.php?type=" + key + "&id=" + id, options)
            .do(data=>
            {
                console.log("Deleted  " + id);
            } );
    }

    isSaveWrapper(value:any) : boolean
    {
        return value && value.ID && value.Title && value.Data && value.Updated;
    }

    toSaveWrapper<T>(value:any): SaveWrapper<T>
    {
        if(this.isSaveWrapper(value))
        {
            if(this.isSaveWrapper(value.Data))
                return this.toSaveWrapper<T>(value.Data);
            else
                return value;
        }        
    }

    getSingle<T>(key:string, name:string) : Observable<SaveWrapper<T>>
    {
        var loadedList = this.getLoadedData<T>(key);
        if(loadedList != null)
        {
            var single = loadedList[name];
            if(single)
            {
                //console.log("Loaded cached " + key + " " + name);
                var dummyArray = new Array();
                dummyArray.push(single);
                return Observable.from(dummyArray);
            }
        }

        var dis = this;
        return this._http.get(this.host + "/service/db.php?type=" + key + "&name=" + encodeURIComponent(name))
            .map((r:Response) => 
            {
                var result = <SaveWrapper<T>>r.json();
                var dateStr:any = result.Updated.toString();
                result.Updated = new Date(dateStr);                
                return result;
               
            })
            .do(data=>
            {
                //console.log("Downloaded " + key + " " + data.ID + " " + data.Title);
                var list = dis.getOrCreateLoadedData<T>(key);
                list[name] = this.toSaveWrapper<T>(data);

                this.getSubject<T>(key).next(data.Data);
            } );
    }

    extractData<T>(list:Array<any>) : Array<T>
    {
        return list.map(item=>
        {
            while(item.Data)
            {
                item = item.Data;
            }

            return item;
        })
    }

    getList<T>(key:string, sortByName:boolean) : Observable<T[]>
    {
        var options = new RequestOptions({ headers: new Headers({
            "content-type":"text/json","list":key})});
 
        var ret = this.getLoadedData<T>(key);
        if(ret != null)
        {
            var dummyArray = new Array();
            dummyArray.push(ret);
            return Observable.from(dummyArray);
        }
        else
        {
            //console.log("Getting " + key + " list...");
            
           return this._http.get(this.host + "/service/db.php?type=" + key + "&name=all")

                .map((r:Response) => 
                {
                 
                    var result = <SaveWrapper<T>[]>r.json(); 

                    if(sortByName)
                    {
                        result = result.sort((a:SaveWrapper<T>,b:SaveWrapper<T>)=>a.Title > b.Title ? 1 : -1);
                    }
                    else 
                    {
                        result = result.sort((a:SaveWrapper<T>,b:SaveWrapper<T>)=>a.Updated > b.Updated ? 1 : -1);
                    }
                    
                                 
                    var ret = this.extractData(result);
                    return ret;
                })   
                .catch((error:any)=> {
                    console.log(error);
                    alert("oh noes!" + error);
                    return Observable.throw(error);  
                })
                .do(data=>
                {            
                   // console.log("Got " + key + " list...");
                    this.Data[key] = data;           
                    this.DataLoadedSubjects[key].next(data);
                });               
        }
    }
    
    getEmptyObservable<T>(item:T):Observable<T>
    {
        var dummy = new Array();
        dummy.push(item);
        return Observable.from(dummy);
    }

}