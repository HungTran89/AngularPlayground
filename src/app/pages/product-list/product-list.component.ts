import { Component, inject, signal } from '@angular/core';
import { Product } from '../../models/product';
import { FakeStoreAPIService } from '../../services/FakeStoreAPI/fake-store-api.service';
import { ProductCardComponent } from "../product-card/product-card/product-card.component";

@Component({
  selector: 'app-product-list',
  imports: [ProductCardComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {
  products = signal<Product[]>([]);
  fakeAPI = inject(FakeStoreAPIService);
  async ngOnInit() {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    const data = await this.fakeAPI.GetAllProducts();
    this.products.set(data)
  }
}
