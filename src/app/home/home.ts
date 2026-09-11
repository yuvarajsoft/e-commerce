import { Component, OnInit } from '@angular/core';
import { Product } from '../../services/product';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {

  constructor(private productservice:Product){}
  ngOnInit(): void {
    this.productservice.getAllproduct().subscribe({
next:(res)=>{console.log(res)},
error:(err)=>{console.log(err)}
    })
  }

}
