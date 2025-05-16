import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FakeStoreAPIService {

  constructor() { }

  async GetAllProducts() {
    const res = await fetch('https://fakestoreapi.com/products');
    const allProduct = await  res.json();
    return allProduct;
  }
}
