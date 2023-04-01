import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { SignupService } from './signup.service';
import constant from '../../assets/constant';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  readonly CONSTANT = constant;
  coachForm!: FormGroup;
  userForm!: FormGroup;
  role!: string;
  success!:boolean;
  id!:any;
  coach!:boolean;
  user!:boolean;
  coachf!:boolean;
  userf!:boolean;
  private routeSub!: Subscription;
  constructor(private route: ActivatedRoute,private formBuilder :FormBuilder,private signupService:SignupService) {}
  ngOnInit() {
    this.routeSub=this.route.params.subscribe(params =>{
      this.role=params['role'];
    })
    if(this.role==="coaches"){
      this.coachf=true;
      this.userf=false;
      this.coach=false;
      this.user=false;
      this.coachForm=this.formBuilder.group({
      name :['',[Validators.required,Validators.pattern('.{3,50}')]],
      password : ['',[Validators.required,Validators.pattern('.{5,10}')]],
      mobileNumber: ['',[Validators.required,Validators.pattern('[0-9]{10}')]],
      dateOfBirth: ['',[Validators.required,ageCalculator]],
      gender: ['',[Validators.required]],
      speciality:['',[Validators.required,Validators.pattern('.{10,50}')]]
      })

    }
    else if(this.role==="users"){
      this.coachf=false;
      this.userf=true;
      this.coach=false;
      this.user=false;
      this.userForm=this.formBuilder.group({
        name :['',[Validators.required,Validators.pattern('.{3,50}')]],
        password : ['',[Validators.required,Validators.pattern('.{5,10}')]],
        email:['',[Validators.required]],
        mobileNumber: ['',[Validators.required,Validators.pattern('[0-9]{10}')]],
        dateOfBirth: ['',[Validators.required,ageCalculator]],
        gender: ['',[Validators.required]],
        pincode:['',[Validators.required,Validators.pattern('[0-9]{6}')]],
        city :['',[Validators.required,Validators.pattern('.{3,20}')]],
        state :['',[Validators.required,Validators.pattern('.{3,20}')]],
        country :['',[Validators.required,Validators.pattern('.{3,20}')]],
        })

    }
  }
  coachRegister(){
    let url ="http://localhost:8080/coaches";
    this.success=false;
    this.signupService.register(this.coachForm.value,url).subscribe(res=>{
        for (const [key, value] of Object.entries(res)) {
          if(key=='id'){
            this.id=value;
            this.success=true;
            console.log("value",this.id)
          }
        }
        if(this.success){
          this.coachf=false;
          this.userf=false;
          this.coach=true;
          this.user=false;
        }
          });
    
  }
  userRegister(){
    let url ="http://localhost:8080/users";
    this.success=false;
    this.signupService.register(this.userForm.value,url).subscribe(res=>{
        for (const [key, value] of Object.entries(res)) {
          if(key=='id'){
            this.id=value;
            this.success=true;
            console.log("value",this.id)
          }
        }
        if(this.success){
          this.coachf=false;
          this.userf=false;
          this.coach=false;
          this.user=true;
        }
          });
      
  }
  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }
}
function ageCalculator(fc: FormControl): { [key: string]: boolean } | null {
  var today = new Date();
    var birthDate = new Date(fc.value);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    if(age>=20&&age<=100){
      return null;
    }
    return {'invalid':true};
}
