import { Component, OnInit } from '@angular/core';
import { Product } from '../../services/product';
import { Iproduct } from '../iproduct';
import { CurrencyPipe, NgFor } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [NgFor,CurrencyPipe],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
 products: Iproduct[] = [];
  constructor(private productservice:Product){}
  ngOnInit(): void {
    this.productservice.getAllproduct().subscribe({
next:(res:any)=>{
  this.products=res.data
     console.log(this.products)
},
error:(err)=>{console.log(err)}
    })
 
  }

}
