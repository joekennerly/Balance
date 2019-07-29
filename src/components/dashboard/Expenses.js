import React, { Component } from "react"
import EntryForm from "./EntryForm"

export default class Expenses extends Component {
  //TODO Add state for expense category
  render() {
    return (
      <React.Fragment>
        <section className="expenses ui five column grid">
          <div className="row card">
            <div className="column">
              <b>Date</b>
            </div>
            <div className="column">
              <b>Category</b>
            </div>
            <div className="column">
              <b>Name</b>
            </div>
            <div className="column">
              <b>Amount</b>
            </div>
          </div>
          <div className="row card">
            <EntryForm {...this.props} />
          </div>
            {this.props.expenses.map(expense => (
              <div key={expense.id} className="row card">
                <div className="column">{expense.date}</div>
                <div className="column">{expense.category}</div>
                <div className="column">{expense.name}</div>
                <div className="column">{expense.amount}</div>
                <button className="ui button">x</button>
              </div>
            ))}
        </section>
      </React.Fragment>
    )
  }
}
