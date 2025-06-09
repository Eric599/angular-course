import { CurrencyPipe } from '@angular/common'
import { Component, inject, Input } from '@angular/core'
import { InvestmentService } from '../investment.service'

@Component({
  selector: 'app-investment-results',
  standalone: false,
  templateUrl: './investment-results.component.html',
  styleUrl: './investment-results.component.css',
})
export class InvestmentResultsComponent {
  private investmentService = inject(InvestmentService)

  get investmentResults() {
    return this.investmentService.resultData
  }
}
