import React, { Component } from "react"

export default class Totals extends Component {
  expenses = [
    5.89,
    5.66,
    5.66,
    5.66,
    5.66,
    5.66,
    5.66,
    5.66,
    5.66,
    5.66
  ]

  income = [
    100.21,
    100.21,
    100.21,
    100.21,
    100.21
  ]

  sum = (arrayOfExp) => {
    let sum = 0
    arrayOfExp.forEach(expense => {
      return sum += expense
    })
    return sum.toFixed(2)
  }
  diff = (inTotal, exTotal) => {
    return inTotal - exTotal
  }

  render() {
    let totalIn = this.sum(this.income)
    let totalEx = this.sum(this.expenses)
    return (
      <React.Fragment>
        <div className="ui three column grid">
          <div className="column"><h1>Income: ${`${totalIn}`}</h1></div>
          <div className="column"><h1>Expense: ${`${totalEx}`}</h1></div>
          <div className="column">
            <h1>Balance: ${`${this.diff(totalIn, totalEx)}`}</h1>
          </div>
        </div>
      </React.Fragment>
    )
  }
}
