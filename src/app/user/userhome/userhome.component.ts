import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { UserhomeService } from './userhome.service';
import constant from '../../../assets/constant';


@Component({
  selector: 'app-userhome',
  templateUrl: './userhome.component.html',
  styleUrls: ['./userhome.component.css']
})

export class UserhomeComponent implements OnInit {
  readonly CONSTANT = constant;
  id!:number;
  coachDetail!:any[]
  selectedId!:number;
  book!:boolean;
  bookForm!:FormGroup;
  success!:boolean;
  constructor(private userhomeService:UserhomeService,private formBuilder :FormBuilder) {}
  ngOnInit() {
    this.bookForm=this.formBuilder.group({
      appointmentDate: ['',[Validators.required,dateCalculator]],
      slot :['',[Validators.required]]
      })
    this.id=parseInt(sessionStorage.getItem("loggedUser") || '0');
    this.allcoaches();
  }
  allcoaches(){
    this.coachDetail=[];
    this.userhomeService.allcoaches().subscribe(res=>{
      this.coachDetail=res;
    })
  }
  onClick(id:number){
    this.book=true;
    this.selectedId=id;
  }
  confirmAppointment(){
    var obj={appointmentDate:this.bookForm.controls["appointmentDate"].value,slot:this.bookForm.controls["slot"].value,userId:this.id,coachId:this.selectedId}
    this.userhomeService.confirmAppointment(obj).subscribe(res=>{this.success=true;this.book=false});
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
    return {'age':true};
}
