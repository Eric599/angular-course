import { Component, inject } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { InvestmentService } from '../investment.service'

@Component({
  selector: 'app-user-input',
  standalone: false,
  templateUrl: './user-input.component.html',
  styleUrl: './user-input.component.css',
})
export class UserInputComponent {
  private investmentService = inject(InvestmentService)

  initialInvestment = '0'
  annualInvestment = '0'
  expectedReturn = '5'
  duration = '10'

  onSubmit() {
    this.investmentService.calculateInvestmentResults({
      initialInvestment: +this.initialInvestment,
      annualInvestment: +this.annualInvestment,
      expectedReturn: +this.expectedReturn,
      duration: +this.duration,
    })
  }
}
