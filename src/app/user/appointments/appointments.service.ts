import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppointmentsService {

  constructor(private http:HttpClient) { }
    appointMents():Observable<any[]>{
      return this.http.get<any[]>("http://localhost:8080/bookings");
    }
    confirmReschedule(obj:any,id:any){
      return this.http.patch("http://localhost:8080/bookings/"+id,obj);
    }
    cancelSchedule(id:any){
      console.log("http://localhost:8080/bookings/"+id);
      return this.http.delete("http://localhost:8080/bookings/"+id);
    }
}
