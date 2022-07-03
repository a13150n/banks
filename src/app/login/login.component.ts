import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  aim="your banking partner"
  accno="your account number please"
  acno=""
  pwd=""
  
  //login group model
   
  loginForm=this.fb.group({
    acno:['',[Validators.required,Validators.pattern('[0-9]*')]],
    pwd:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]]
    
  })

  constructor(private router:Router,private ds:DataService,private fb:FormBuilder) { }

  ngOnInit(): void {
  }
//acno fetch
  acnoChange(event:any){
    this.acno=event.target.value
    console.log(this.acno)
  }

  //pswrd fetch

  pwdChange(event:any){
    this.pwd=event.target.value
    console.log(this.pwd)
  }

  //template reference variable 

  
//  login(a:any,p:any){
//    var acno=a.value
//      var pwd=p.value
//     let database = this.database
//
//   if(acno in database){
//        if(pwd==database[acno]["password"]){
//       alert("login succesfull")
//      }
//        else{
//       alert("incorrect password")O
//        }
//
//     }
//      else{
//        alert("user doesnot exist")
//      }
//    }
  // event binding  using $event as arguments

  login(){
    var acno= this.loginForm.value.acno
    var pwd= this.loginForm.value.pwd
    if(this.loginForm.valid){
    const result = this.ds.login(acno,pwd)

    
      if(result){
       alert("login succesfull")
       this.router.navigateByUrl("homepage")
    
      }
    }
    else{
      alert("invalid form")
    }
    }
  }
