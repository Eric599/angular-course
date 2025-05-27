import { Component, computed, signal } from '@angular/core';
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
    //selectedUser = DUMMY_USERS[randIndex]
    selectedUser = signal(DUMMY_USERS[randIndex])
    // signals need to use computed function instead of having getter function below
    // signals have better performance
    imagePath = computed(() => 'assets/users/' + this.selectedUser().avatar)
    
    // "getter" function to get imagePath of user
    // get imagePath() {
    //     return 'assets/users/' + this.selectedUser.avatar
    // }

    onSelectUser() {
        const randIndex = Math.floor(Math.random() * DUMMY_USERS.length)
        this.selectedUser.set(DUMMY_USERS[randIndex])
        // if we weren't using signals
        //this.selectedUser = DUMMY_USERS[randIndex]
    }
}
