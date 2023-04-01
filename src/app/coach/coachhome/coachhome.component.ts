import { Component, OnInit } from '@angular/core';
import { CoachhomeService } from './coachhome.service';
import constant from '../../../assets/constant';

@Component({
  selector: 'app-coachhome',
  templateUrl: './coachhome.component.html',
  styleUrls: ['./coachhome.component.css']
})
export class CoachhomeComponent implements OnInit {
  readonly CONSTANT = constant;
  id!:number;
  schedulesDetail!:any[]
  constructor(private coachhomeService:CoachhomeService){}
  ngOnInit() {
    this.id=parseInt(sessionStorage.getItem("loggedUser") || '0');
    this.schedules();
  }
  schedules(){
    this.schedulesDetail=[]
    this.coachhomeService.schedules().subscribe(res=>{
      for(const obj of res){
        if(this.id===getId(obj)){
          this.schedulesDetail.push(obj);
        }
      }
      console.log(this.schedulesDetail);
    }
    );
  }

}

function getId(res:any):any{
  let id;
  for (const [key, value] of Object.entries(res)) {
    if(key=='coachId'){
      id=value;
    }
  }
  return id;
}