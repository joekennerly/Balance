import React, { Component } from "react"

export default class Totals extends Component {
  // income = [
  //   { amount: 100.21, id: 1 },
  //   { amount: 100.21, id: 2 },
  //   { amount: 100.21, id: 3 },
  //   { amount: 100.21, id: 4 },
  // ]

  sum = (entryArray) => {
    let sum = 0
    entryArray.forEach(entry => {
      return sum += +entry.amount
    })
    // return sum
    return sum.toFixed(2)
  }
  diff = (inTotal, exTotal) => {
    let diff = inTotal - exTotal
    return diff.toFixed(2)
  }

  render() {
    let totalIn = this.sum(this.props.income)
    let totalEx = this.sum(this.props.expenses)
    return (
        <div className="totals ui three column grid">
          <div className="column"><h1>Income: ${`${totalIn}`}</h1></div>
          <div className="column"><h1>Expense: ${`${totalEx}`}</h1></div>
          <div className="column">
            <h1>Balance: ${`${this.diff(totalIn, totalEx)}`}</h1>
          </div>
        </div>
    )
  }
}
