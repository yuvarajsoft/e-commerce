import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ICart } from '../../constants/constants';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-checkout',
  imports: [RouterLink,NgFor],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css',
})
export class Checkout implements OnInit {
  
   cartItems: ICart[] = [];
  
  
  ngOnInit(): void {
    this.cartItems=history.state.cartitem ||[]
    console.log('checkout'+this.cartItems)
  }

  getCartTotal(): number {

  return this.cartItems.reduce(
    (total, item) =>
      total + (item.productPrice * item.quantity),
    0
  );

}

  
}
