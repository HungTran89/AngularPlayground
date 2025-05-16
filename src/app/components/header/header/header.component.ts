import { Component, inject } from '@angular/core';
import { PrimaryButtonComponent } from "../../primary-button/primary-button.component";
import { CartService } from '../../../services/CartService/cart.service';

@Component({
  selector: 'app-header',
  imports: [PrimaryButtonComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  title = "Hung's App"
  cartService = inject(CartService)

  
  showBtnClick() {
    console.log('clicked');
  }
}
