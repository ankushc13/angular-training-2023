import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AppointmentsService } from './appointments.service';
import constant from '../../../assets/constant';


@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent implements OnInit {
  readonly CONSTANT = constant;
  id!:number;
  appoints!:any[];
  reschedule!:boolean;
  bookId!:number;
  bookForm!:FormGroup;
  success!:boolean;
  popup!:boolean;
  constructor(private appointmentsService:AppointmentsService,private formBuilder :FormBuilder) {  }
  ngOnInit(){
    this.id=parseInt(sessionStorage.getItem("loggedUser") || '0');
    this.appointMents();
    this.bookForm=this.formBuilder.group({
      appointmentDate: ['',[Validators.required,dateCalculator]],
      slot :['',[Validators.required]]
      })
 }
 onClick(bookId:number){
  this.bookId=bookId;
  this.reschedule=true;
 }
 confirmReschedule(){
  var obj={appointmentDate:this.bookForm.controls["appointmentDate"].value,slot:this.bookForm.controls["slot"].value}
  this.appointmentsService.confirmReschedule(obj,this.bookId).subscribe(res=>{this.success=true;this.reschedule=false});
 }
cancelSchedule(){
  this.appointmentsService.cancelSchedule(this.bookId).subscribe(res=>{this.success=false;this.reschedule=false;window.location.reload();});
}
 appointMents(){
  this.appoints=[];
  this.appointmentsService.appointMents().subscribe(res=>{
    for(let val of res){
      if(val.userId==this.id){
        this.appoints.push(val);
      }
    }
    console.log(this.appoints,this.id);
  }
  );
 }
}
function dateCalculator(fc: FormControl): { [key: string]: boolean } | null {
  var date2 = new Date();
    var date1 = new Date(fc.value);
    var diff = Math.abs(date1.getTime() - date2.getTime());
    var diffDays = Math.ceil(diff / (1000 * 3600 * 24)); 
    if(diffDays>=0&&diffDays<=7){
      return null;
    }
    return {'invalid':true};
}