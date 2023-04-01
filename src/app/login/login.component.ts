import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { LoginService } from './login.service';
import constant from '../../assets/constant';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  readonly CONSTANT = constant;
  coachForm!: FormGroup;
  userForm!: FormGroup;
  role!: string;
  fail!:boolean;
  id!:number;
  coach!:boolean;
  user!:boolean;
  coachf!:boolean;
  userf!:boolean;
  private routeSub!: Subscription;

  constructor(private router: Router,private route: ActivatedRoute,private formBuilder :FormBuilder,private loginService:LoginService) {}

  ngOnInit() {
    this.routeSub=this.route.params.subscribe(params =>{
      this.role=params['role'];
    })
    if(this.role==="coaches"){
      this.coachForm=this.formBuilder.group({
      id :['',[Validators.required]],
      password : ['',[Validators.required,Validators.pattern('.{5,10}')]]
      })
    }
    else if(this.role==="users"){
      this.userForm=this.formBuilder.group({
        id :['',[Validators.required]],
        password : ['',[Validators.required,Validators.pattern('.{5,10}')]]
      })
    }
    
  }
  coachLogin(){
    this.fail=false;
    let url ="http://localhost:8080/coaches/";
    this.loginService.login(this.coachForm.value,url).subscribe(res=>{this.id= this.coachForm.controls["id"].value
    if(!this.fail){
      sessionStorage.clear()
      sessionStorage.setItem('loggedUser', ''+this.id);
      this.router.navigate(['../../coach']);
    }
  },error=>this.fail=true);
    
  }
  userLogin(){
    this.fail=false;
    let url ="http://localhost:8080/users/";
    this.loginService.login(this.userForm.value,url).subscribe(res=>{this.id= this.userForm.controls["id"].value
    if(!this.fail){
      sessionStorage.clear()
      sessionStorage.setItem('loggedUser', ''+this.id);
      this.router.navigate(['../../user']);
    }
  
  },error=>this.fail=true);
    
  }
  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

}
