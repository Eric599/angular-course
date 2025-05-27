import { Component, Input } from '@angular/core';
import { DUMMY_USERS } from '../dummy-users';

const randIndex = Math.floor(Math.random() * DUMMY_USERS.length)

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
    // input decorator is similar to setting props in React
    // if we are going to use '!' to assert, always set required to true
    @Input({required: true}) avatar!: string
    @Input({required: true}) name!: string

    get imagePath() {
        return 'assets/users/' + this.avatar
    }
    onSelectUser() { }
}
