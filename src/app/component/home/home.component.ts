import { Component, inject, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ChildOneComponent } from "./child-one/child-one.component";
import { FormsModule } from '@angular/forms';
import { PrimaryButtonComponent } from "../../components/primary-button/primary-button.component";
import { CartService } from '../../services/CartService/cart.service';

@Component({
  selector: 'app-home',
  imports: [RouterLink, ChildOneComponent, FormsModule, PrimaryButtonComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  msgToChild: string = 'From Parent';
  homeMsg: string = 'Home Component';
  isDisabled: boolean = false;
  fromChild: string = '';
  pimraryBtnLable = "hello Hung"
  cartService = inject(CartService);

  receiveMessage(msg: string) {
    console.log(msg);
    this.fromChild = msg;
  }

}
