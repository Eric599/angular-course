import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { UserInputComponent } from './user-input.component'

// example of making module, useful for if there is a bunch of components to export
@NgModule({
  declarations: [UserInputComponent],
  imports: [FormsModule],
  exports: [UserInputComponent],
})
export class UserInputModule {}
