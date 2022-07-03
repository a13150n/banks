import { Injectable } from '@angular/core';
import { LoginComponent } from '../login/login.component';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  currentAcno:any
  currentUname:any


  //login
  login(acno: any, pwd: any) {
    let database= this.database
  if(acno in database){
    if(pwd == database[acno]["password"]){
      this.currentAcno = acno
      this.currentUname = database[acno]["uname"]
      this.storeData()
      return true
    }
    else{
      alert("incorrect password")
      return false
    }
  }
  else{
    alert("user doesnot exist !!!")
    return false
  }
    
  }

  database:any={
    1000:{acno:1000,uname:"abi",password:1000,balance:5000,transaction:[]},
    1001:{acno:1001,uname:"aji",password:2000,balance:6000,transaction:[]},
    1002:{acno:1002,uname:"jobi",password:3000,balance:7000,transaction:[]}
  }

  constructor() { 
    this.getData()
  }

  //to store data in local storage

  storeData(){
    localStorage.setItem("database",JSON.stringify(this.database))
    if(this.currentAcno){
      localStorage.setItem("currentAcno",JSON.stringify(this.currentAcno))
    }
    if(this.currentUname){
      localStorage.setItem("currentUname",JSON.stringify(this.currentUname))
    }
  }
//get data from local Storage
  getData(){


    if(localStorage.getItem("database")){
      this.database = JSON.parse(localStorage.getItem("database") || '')
    }
    if(localStorage.getItem("currentAcno")){
      this.currentAcno = JSON.parse(localStorage.getItem("currentAcno") || '')
    }
    if(localStorage.getItem("currentUname")){
      this.currentUname = JSON.parse(localStorage.getItem("currentUname") || '')
    }


  }
  // register

  register(acno:any,password:any,uname:any){
    let database = this.database
    if(acno in this.database){
      return false
    }
    else{
      database[acno]={
        acno,
        uname,
        password,
        balance:0,
        transaction:[]
      }
      this.storeData()
      return true

    }
  }

  // deposit

  deposit(acno:any,password:any,amt:any){
    var amount = parseInt(amt)
    let database = this.database
    if(acno in database){
      if(password == database[acno]["password"]){
        database[acno]["balance"]=database[acno]["balance"]+amount
        database[acno]["transaction"].push({
          amount:amount,
          type:"CREDIT"
        })
        this.storeData()
        return database[acno]["balance"]
      }
      else{
        alert("incorrect password")
        return false
      }
    }
    else{
      alert("user doesnot exist")
      return false
    }
  }
  withdraw(acno:any,password:any,amt:any){
    var amount = parseInt(amt)
    let database = this.database
    if(acno in database){

    
      if(password == database[acno]["password"]){

        if(database[acno]["balance"]>amount){
          database[acno]["balance"]=database[acno]["balance"]-amount
          database[acno]["transaction"].push({
            amount:amount,
            type:"DEBIT"
          })
          this.storeData()
          return database[acno]["balance"]
        }
       else{
         alert("Insufficient balance")
         return false
       }
      }
      else{
        alert("incorrect password")
        return false
      }
    }
    else{
      alert("user doesnot exist")
      return false
    }
  }

//transaction history

getTransaction(acno:any){
  return this.database[acno]["transaction"]
}

}

