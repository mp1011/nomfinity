import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {LoginService} from '../services/login.service';

@Injectable()
export class ImageService
{
    private imageUploadURL : string = "http://www.nomfinity.com/service/upload.php";
    private imageDownloadURL : string = "http://www.nomfinity.com/uploads/";
       
    constructor(private _loginService : LoginService)
    {
        this._loginService.WhenUserLoggedIn().subscribe();
    }

    uploadImage(imageFile : File, onProgress : (percent:Number)=>void, onComplete : (name:string)=>void)
    {
        var uploadTask : Observable<any> = this.makeFileRequest(imageFile, onProgress);
        uploadTask.subscribe(()=> { onComplete(imageFile.name); });
    }

    public getUploadedImagePath(name:string):string 
    {
        return this.imageDownloadURL + name;
    }

    private makeFileRequest (file: File, onProgress : (percent:Number)=>void): Observable<any> 
    {
        return Observable.create((observer:any) => 
        {
            let formData: FormData = new FormData(),
                xhr: XMLHttpRequest = new XMLHttpRequest();

            formData.append("recipe_image", file, file.name);
            
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    observer.next(xhr.response);
                    observer.complete();
                } else {
                    observer.error(xhr.response);
                }
                }
            };

            xhr.upload.onprogress = (event) => 
            {
                onProgress(Math.round(event.loaded / event.total * 100));
            };

            xhr.open('POST', this.imageUploadURL, true);
            xhr.setRequestHeader("token", this._loginService.LoginToken);       
            xhr.send(formData);
        });
  }

}