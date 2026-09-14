import { Component, inject, OnInit, signal } from '@angular/core';
import { Product } from '../../services/product';
import { Iproduct } from '../iproduct';
import { CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { IAddCart, ICart, IResponse } from '../../constants/constants';
import { Modal, Offcanvas } from 'bootstrap';

@Component({
  selector: 'app-home',
  imports: [NgFor, CurrencyPipe, RouterLink,NgIf],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
   user: any = JSON.parse(localStorage.getItem('user') || 'null');
  products = signal<Iproduct[]>([]);
showUserMenu = false;
  category = signal<any[]>([]);
  cartdetails = signal<ICart[]>([]);
  selecttedProduct: Iproduct | null = null;
  private route=inject(Router)
  addcartitems: IAddCart = {
    CartId: 0,
    CustId: 0,
    ProductId: 0,
    Quantity: 1,
    AddedDate: new Date()
  };
  constructor(private productservice: Product) { }

  ngOnInit(): void {
console.log(this.user)

    this.getallproduct();
    this.getallcategory();
    this.getCartDetailsById(this.user.custId);
  }


  getallproduct() {
    this.productservice.getAllproduct().subscribe({
      next: (res: any) => {
        this.products.set(res.data);
        console.log(this.products());
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
  getallcategory() {

    this.productservice.getAllCategory().subscribe({
      next: (res: any) => {

        this.category.set(res.data);

        console.log(this.category());

      },
      error: (err) => {
        console.log(err);
      }
    });

  }

  getAllCategoryById(id: number) {
    this.productservice.getAllCategoryById(id).subscribe({
      next: (res: any) => {
        this.products.set(res.data)
      }, error: (err) => {
        console.log(err)
      }
    })
  }

  addcart(item: any) {
    debugger
    this.addcartitems.Quantity = 1;
    this.selecttedProduct = item;
  }

  addCartitem(addcartitems: IAddCart) {
    debugger
    this.addcartitems.Quantity = addcartitems.Quantity;
    this.addcartitems.ProductId = this.selecttedProduct?.productId ?? 0;
    this.addcartitems.CustId = this.user.custId;
    this.productservice.addtoCart(this.addcartitems).subscribe({
      next: (ret: IResponse) => {

this.getCartDetailsById(this.user.custId)
        console.log(ret.message);

        // Close Product Modal
        const modalElement = document.getElementById('cartModal');

        if (modalElement) {

          const modal = Modal.getInstance(modalElement);

          if (modal) {
            modal.hide();
          }
        }

        // Open Cart Offcanvas
        const cartElement = document.getElementById('cartOffcanvas');

        if (cartElement) {

          // Remove old backdrop
          document.querySelectorAll('.modal-backdrop, .offcanvas-backdrop')
            .forEach(backdrop => backdrop.remove());

          // Clean body
          document.body.classList.remove('modal-open');
          document.body.style.removeProperty('overflow');
          document.body.style.removeProperty('padding-right');

          // Offcanvas without gray background
          const offcanvas = Offcanvas.getOrCreateInstance(
            cartElement,
            {
              backdrop: false,
              scroll: true
            }
          );

          offcanvas.show();

        }


      }, error: (err) => { console.log(err) }
    })
  }
  increaseqty() {
    this.addcartitems.Quantity++;
  }
  decreaseqty() {
    if (this.addcartitems.Quantity > 1) {
      this.addcartitems.Quantity--;
    }
  }

  getCartDetailsById(id:number){
    this.productservice.getCartById(id).subscribe({
      next:(res:any)=>{
        this.cartdetails.set(res.data  as ICart[])
      },
      error:(err)=>{console.log(err)}
    })
  }


  increaseCart(item:ICart){

    
    item.quantity++;
   
this.updateCartitem(item);
  }

   decreaseCart(item:ICart){
    item.quantity--;
    this.updateCartitem(item)
  }

  updateCartitem(item:ICart)
  {
     this.addcartitems.Quantity = item.quantity;
    this.addcartitems.ProductId = item.productId?? 0;
    this.addcartitems.CustId = this.user.custId;
    this.productservice.addtoCart(this.addcartitems).subscribe({
      next:(res:any)=>{

      },error:(err)=>{console.log(err)}
    })
  }

  removacart(item:ICart){
this.productservice.removeCartBycartId(item.cartId).subscribe({
  next:(res:any)=>{
    
    this.getCartDetailsById(this.user.custId);
    console.log(res.data)},error:(err)=>{console.log(err)}
})
  }
  getCartTotal(): number {

  return this.cartdetails().reduce(
    (total, item) =>
      total + (item.productPrice * item.quantity),
    0
  );

}

gotocheckout()
{
  this.route.navigate(['/checkout'],{
    state:{
      cartitem:this.cartdetails()
    }
  })
}

logout() {

  localStorage.removeItem('user');

  this.user = null;

  this.showUserMenu = false;

  this.route.navigate(['/login']);
}
}