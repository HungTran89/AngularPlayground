import { CurrencyPipe } from '@angular/common';
import { Component, resource, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dummy-json',
  imports: [FormsModule, CurrencyPipe],
  templateUrl: './dummy-json.component.html',
  styleUrl: './dummy-json.component.css'
})
export class DummyJsonComponent {
 private readonly dummyJsonProduct = 'https://dummyjson.com/products';
  limitProduct = signal(5);
  constructor() { 
    console.log('DummyJson constructor');
  }

  protected myResource = resource({
    //?limit=10&skip=10&select=title,price
    request: () => ({limit: this.limitProduct()}),
    loader: async ({request, abortSignal}) => {
      const response = await fetch(this.dummyJsonProduct + `?limit=${request.limit}`, { signal: abortSignal });
      const data = await response.json();
      //console.log(data)
      return data.products;
    }
  })
}
