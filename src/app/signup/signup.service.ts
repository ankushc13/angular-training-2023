import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private http:HttpClient) { }

  register(data:any,url:string):Observable<any>{
    console.log(JSON.stringify(data));
    return this.http.post<any>(url,data);
  }
}
