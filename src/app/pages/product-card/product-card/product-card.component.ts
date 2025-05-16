import { Component, inject, input } from '@angular/core';
import { Product } from '../../../models/product';
import { PrimaryButtonComponent } from "../../../components/primary-button/primary-button.component";
import { CurrencyPipe } from '@angular/common';
import { CartService } from '../../../services/CartService/cart.service';

@Component({
  selector: 'app-product-card',
  imports: [PrimaryButtonComponent, CurrencyPipe],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
  cartService = inject(CartService);
 product = input.required<Product>();
}
