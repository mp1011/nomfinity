import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs/Rx';

declare var gapi:any;

@Injectable()
export class LoginService
{
    public static GoogleLoginButtonID:string="gauth_btn";

    private _loggedIn:boolean=false;

    public LogonName:string="";

    public LoginToken:string;

    private UserLoginSubject = new Subject<boolean>();

    public IsLoggedIn():boolean
    {
        return this._loggedIn;
    }

    public WhenUserLoggedIn() : Observable<boolean>
    {
        return this.UserLoginSubject.asObservable();
    }

    constructor()
    {
      
    }
    
    private RenderLoginButton(auth:any) : void 
    {
       
    }

    public LogOut():void
    {
      
    }
}