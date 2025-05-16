import { Component } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { fromFetch } from 'rxjs/fetch';

@Component({
  selector: 'app-users',
  imports: [],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
  private readonly API_URL = 'https://randomuser.me/api/?results=50&gender=female'

  constructor() {
    console.log('user constructor')
  }

  protected resource = rxResource({
    loader: () => fromFetch(this.API_URL)
  });
}
