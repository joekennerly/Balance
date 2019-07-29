import React, { Component } from "react"
import EntryForm from "./EntryForm"

export default class Expenses extends Component {

  update = (id) => {
    console.log("edit click", id)
    // return this.props.updateItem("expenses", this.state, "/dashboard")
  }

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
              <div id="date" className="column">{expense.date}</div>
              <div id="category" className="column">{expense.category}</div>
              <div id="name" className="column">{expense.name}</div>
              <div id="amount" className="column">{expense.amount}</div>
              <button
                className="ui button"
                onClick={()=>this.update(expense.id)}
              >e</button>
              <button
                className="ui button"
                onClick={()=>this.props.deleteItem("expenses", expense.id, "/dashboard")}
              >x</button>
            </div>
          ))}
        </section>
      </React.Fragment>
    )
  }
}