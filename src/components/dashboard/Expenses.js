import React, { Component } from "react"

export default class Expenses extends Component {
  //TODO Add state for expense category
  render() {
    console.log(this.props.expenses)
    return (
      <React.Fragment>
        <section className="expenses ui six column grid">
          {this.props.expenses.map(expense => (
            <div key={expense.id} className="row card">
              <div className="column">{expense.date}</div>
              <div className="column">{expense.category}</div>
              <div className="column">{expense.name}</div>
              <div className="column">{expense.amount}</div>
              <button className="ui button">edit</button>
              <button className="ui button">delete</button>
            </div>
          ))}
        </section>
      </React.Fragment>
    )
  }
}
