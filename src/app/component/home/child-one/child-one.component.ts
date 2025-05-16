import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-child-one',
  imports: [FormsModule],
  templateUrl: './child-one.component.html',
  styleUrl: './child-one.component.css'
})
export class ChildOneComponent {
  @Input() name = '';
  @Output() msgToParent = new EventEmitter<string>();

  sendMessage() {
    this.msgToParent.emit('Hello from ChildOneComponent');
  }

  sendMessage2(evnt: Event) {
    const inputElement = evnt.target as HTMLInputElement;
    this.msgToParent.emit(inputElement.value);
  }
}
