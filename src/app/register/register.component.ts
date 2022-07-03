import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  

  acno=""
  pwd=""
  uname=""

  //register group model
   
  registerForm=this.fb.group({
    acno:['',[Validators.required,Validators.pattern('[0-9]*')]],
    pwd:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]],
    uname:['',[Validators.required,Validators.pattern('[a-zA-Z]*')]]
  })

 constructor(private ds:DataService,private router:Router,private fb:FormBuilder){}

  ngOnInit(): void {
  }


  register(){
    
    var acno = this.registerForm.value.acno
    var pwd = this.registerForm.value.pwd
    var uname = this.registerForm.value.uname
    if(this.registerForm.valid){
    const result=this.ds.register(acno,pwd,uname)

    if(result){
      alert("registered succesfully")
      this.router.navigateByUrl("")
    }
    else{

      alert("user already registered")
      
    }
  }

else{
alert("invalid entry")
}
  }
  
}
