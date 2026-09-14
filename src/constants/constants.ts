export const API_CONSTANTS = {
  get_all_product: 'GetAllProducts',
  get_all_category: 'GetAllCategory',
  get_categoryby_id: 'GetAllProductsByCategoryId?id=',
  user_register: 'RegisterCustomer',
  user_login: 'Login',
  add_to_cart:'AddToCart',
  get_cart_byId:'GetCartProductsByCustomerId?id=',
  remove_cart:'DeleteProductFromCartById?id='
}


export interface IRegister {
  CustId: number,
  Name: string,
  MobileNo: string,
  Password: string
}

export interface IResponse {
  message: string;
  result: boolean;
  data: any;
}

export interface IAddCart {
  CartId: number;
  CustId: number;
  ProductId: number;
  Quantity: number
  AddedDate: Date
}
export interface ICart {
  cartId: number;
  custId: number;
  productId: number;
  quantity: number;
  productShortName: string;
  addedDate: string;
  productName: string;
  categoryName: string;
  productImageUrl: string;
  productPrice: number;
}