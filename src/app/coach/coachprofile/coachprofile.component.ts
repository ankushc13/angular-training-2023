import { Component, OnInit } from '@angular/core';
import { CoachprofileService } from './coachprofile.service';


@Component({
  selector: 'app-coachprofile',
  templateUrl: './coachprofile.component.html',
  styleUrls: ['./coachprofile.component.css']
})
export class CoachprofileComponent implements OnInit {
  id!:number;
  userDetail!:any;
  constructor(private coachprofileService:CoachprofileService) { }

  ngOnInit(): void {
    this.id=parseInt(sessionStorage.getItem("loggedUser") || '0');
    this.viewDetails();
  }
  viewDetails(){
    this.coachprofileService.viewDetail(this.id).subscribe(res=>{
      this.userDetail=res;
      console.log(this.userDetail);
    });
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