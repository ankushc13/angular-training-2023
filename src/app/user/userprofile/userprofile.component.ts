import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../login/login.service';
import { UserprofileService } from './userprofile.service';
import constants from '../../../assets/constant';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {
  id!:number;
  userDetail!:any;
  constructor(private userprofileService:UserprofileService) { }
  
  ngOnInit(): void {
    this.id=parseInt(sessionStorage.getItem("loggedUser") || '0');
    this.viewDetails();
  }
  viewDetails(){
    this.userprofileService.viewDetail(this.id).subscribe(res=>{
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