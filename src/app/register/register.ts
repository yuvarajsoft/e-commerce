import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { validate } from '@angular/forms/signals';
import { RouterLink } from '@angular/router';
import { Product } from '../../services/product';
import { IRegister, IResponse } from '../../constants/constants';

@Component({
  selector: 'app-register',
  imports: [RouterLink,ReactiveFormsModule,CommonModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {

  private service = inject(Product);
  registerForm = new FormGroup({
     CustId: new FormControl(0),
Name:new FormControl('',[Validators.required,Validators.minLength(3)]),
MobileNo:new FormControl('',[Validators.required,Validators.minLength(10)]),
Password:new FormControl('',[Validators.required,Validators.minLength(6)])

  })


  register(){
    
  const obj = this.registerForm.value as IRegister;

  console.log('Request:', obj);
  this.service.registeruser(obj).subscribe({
    next:(res:IResponse)=>{
      
if(res.result)
{
  alert('register succesfully');
  console.log(res.result)
}else
{
  alert('register failed');
   console.log(res.result)
}
    },error:(err)=>{
      console.log(err);
    }
  })
  }

}
