import React, { Component } from "react"

export default class Totals extends Component {
  expenses = [
    {
      amount: 5.55,
      id: 1
    },
    {
      amount: 5.55,
      id: 2
    },
    {
      amount: 5.55,
      id: 3
    },
    {
      amount: 5.55,
      id: 4
    },
    {
      amount: 5.55,
      id: 5
    },
    {
      amount: 5.55,
      id: 6
    }
  ]

  income = [
    {
      amount: 100.21,
      id: 1
    },
    {
      amount: 100.21,
      id: 2
    },
    {
      amount: 100.21,
      id: 3
    },
    {
      amount: 100.21,
      id: 4
    },
  ]

  sum = (arrayOfExp) => {
    let sum = 0
    arrayOfExp.forEach(entry => {
      return sum += entry.amount
    })
    return sum.toFixed(2)
  }
  diff = (inTotal, exTotal) => {
    let diff = inTotal - exTotal
    return diff.toFixed(2)
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
