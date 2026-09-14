import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Iproduct } from '../app/iproduct';
import { API_CONSTANTS, IRegister, IResponse } from '../constants/constants';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class Product {
  constructor(private http: HttpClient) { }
  private apiUrl = `${environment.apiUrl}`;


  getAllproduct() {
    return this.http.get<Iproduct[]>(this.apiUrl + API_CONSTANTS.get_all_product)
  }

  getAllCategory() {
    return this.http.get(environment.apiUrl + API_CONSTANTS.get_all_category)
  }
  getAllCategoryById(id: number) {
    return this.http.get(environment.apiUrl + API_CONSTANTS.get_categoryby_id + id)
  }

  registeruser(obj: IRegister): Observable<IResponse> {
    return this.http.post<IResponse>(environment.apiUrl + API_CONSTANTS.user_register, obj);
  }

  loginuser(obj: any) {
    return this.http.post<IResponse>(environment.apiUrl + API_CONSTANTS.user_login, obj)
  }

  addtoCart(obj: any) {
    return this.http.post<IResponse>(environment.apiUrl + API_CONSTANTS.add_to_cart, obj)
  }

  getCartById(id: number) {
    return this.http.get(environment.apiUrl + API_CONSTANTS.get_cart_byId + id)
  }
  removeCartBycartId(id: number) {
    return this.http.get(environment.apiUrl + API_CONSTANTS.remove_cart + id)
  }
}
