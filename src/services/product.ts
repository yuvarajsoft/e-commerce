import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Iproduct } from '../app/iproduct';


@Injectable({
  providedIn: 'root',
})
export class Product {
  constructor(private http:HttpClient){}
   private apiUrl = `${environment.apiUrl}/GetAllProducts`;
  getAllproduct()
  {
    return this.http.get<Iproduct[]>(this.apiUrl)
  }
}
