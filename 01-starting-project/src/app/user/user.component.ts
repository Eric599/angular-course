import { Component, EventEmitter, Input, Output } from '@angular/core'
import { User } from './user.model'
import { CardComponent } from "../shared/card/card.component";

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent {
  // input decorator is similar to setting props in React
  // if we are going to use '!' to assert, always set required to true
  // @Input({ required: true }) id!: string
  // @Input({ required: true }) avatar!: string
  // @Input({ required: true }) name!: string
  @Input({ required: true }) user!: User
  @Input({ required: true }) isSelected!: boolean
  @Output() selected = new EventEmitter<User>()
  // using output function (not a signal like input function!!)
  // actually does the exact same thing as @Output, just a new way to do things
  // select = output<string>()
  get imagePath() {
    return 'assets/users/' + this.user.avatar
  }
  onSelectUser() {
    this.selected.emit(this.user)
  }
}

// example using signal input, import lowercase input instead, new way of doing things
// import { Component, input, computed } from '@angular/core';

// @Component({
//   selector: 'app-user',
//   standalone: true,
//   imports: [],
//   templateUrl: './user.component.html',
//   styleUrl: './user.component.css'
// })

// export class UserComponent {
//     avatar = input.required<string>()
//     name = input.required<string>()

//     imagePath = computed(() => {
//         return 'assets/users/' + this.avatar()
//     })
//     onSelectUser() {

//     }
// }
