import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from "rxjs/operators";
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  
  constructor(private http:HttpClient) { }

  login(data:any,url:string):Observable<any>{
    let id:any;
    let password:any;
    for (const [key, value] of Object.entries(data)) {
      if(key=='id'){
        id=value;
      }
      else if(key=='password'){
        password=value;
      }
    }
    console.log(id,password)
    return this.http.get<any>(url.concat(id.toString())).pipe(map(res=>{
      let success=false;
      for (const [key, value] of Object.entries(res)) {
        if(key=='password'){
          if(value===password){
            success=true;
          }
        }
      }
      if(!success){
        throw new Error('Invalid');
      }
      else{
        return res;
      }
    }));
  }

}
