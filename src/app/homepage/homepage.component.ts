import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  acno=""
  pwd=""
  amount=""
  acno1=""
  pwd1=""
  amount1=""
  user:any
  lDate:any
  acccno:any
   //deposit form group model
   
   depositForm=this.fb.group({
    acno:['',[Validators.required,Validators.pattern('[0-9]*')]],
    pwd:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]],
    amount:['',[Validators.required,Validators.pattern('[0-9]*')]]
  })

  //deposit form group model
   
  withdrawForm=this.fb.group({
    acno:['',[Validators.required,Validators.pattern('[0-9]*')]],
    pwd:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]],
    amount:['',[Validators.required,Validators.pattern('[0-9]*')]]
  })

  constructor(private ds:DataService,private fb:FormBuilder,private router:Router) { 
    this.user=this.ds.currentUname
    this.lDate=new Date()
  }

  ngOnInit(): void {
    if(!localStorage.getItem("currentAcno")){
      alert("please login")
      this.router.navigateByUrl("")
    }
  }

deposit(){
  
  var acno = this.depositForm.value.acno
  var pwd = this.depositForm.value.pwd
  var amount = this.depositForm.value.amount
  if(this.depositForm.valid){
  const result = this.ds.deposit(acno,pwd,amount)

  if(result){
    alert(amount+"successfully DEPOSITED!!!! new balance is "+ result)
  }

}

else{
  alert("invalid entry")
  }
}
  withdraw(){
  var acno = this.withdrawForm.value.acno
  var pwd = this.withdrawForm.value.pwd
  var amount = this.withdrawForm.value.amount
  if(this.depositForm.valid){
  const result = this.ds.withdraw(acno,pwd,amount)

  if(result){
    alert(amount+"successfully WITHDRAWED!!!! new balance is "+ result)
  }
  }
  else{
    alert("invalid entry")
    }

    
}
logout(){
  localStorage.removeItem("currentAcno")
  localStorage.removeItem("currentUname")
  this.router.navigateByUrl("")
}
deleteAccount(){
this.acccno=JSON.parse(localStorage.getItem("currentAcno")||'')
}

cancel(){
  this.acccno = ""
}
delete(event:any){
  alert("Delete account "+event+" from parent")
  this.router.navigateByUrl("")

}
}
