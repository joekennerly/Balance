import React, { Component } from "react"

export default class Totals extends Component {
  render() {
    let totalIn = this.props.sum(this.props.income)
    let totalEx = this.props.sum(this.props.expenses)
    return (
        <div className="totals ui three column grid">
          <div className="column"><h1>Income: ${`${totalIn}`}</h1></div>
          <div className="column"><h1>Expense: ${`${totalEx}`}</h1></div>
          <div className="column">
            <h1>Balance: ${`${this.props.diff(totalIn, totalEx)}`}</h1>
          </div>
        </div>
    )
  }
}
