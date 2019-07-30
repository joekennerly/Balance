import React, { Component } from "react"
import EntryForm from "./EntryForm"

export default class Expenses extends Component {
  state = {
    date: "",
    category: "",
    name: "",
    amount: ""
  }

  //Save current value when changed
  handleKeyPress = event => {
    console.log(event)
    if (event.key === "Enter") {
      console.log("enter")
    }
    else {
      const stateToChange = {}
      stateToChange[event.target.id] = event.target.value
      this.setState(stateToChange)
    }
  }

  handleClick = (e) => {
    if (!e.target.id.startsWith("edit")) {
      e.target.children[0].classList.toggle("hide")
      e.target.children[0].autofocus = true

      // let simpleId = e.target.id.split("-")[0]
      const newState = {}
      newState[e.target.id] = e.target.value
      this.setState(newState)

      console.log(e.target.id, this.state)
    }
    else {
      //Do nothing if edit-input is clicked
      return e.preventDefault()
    }
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
              <div id={`date-${expense.id}`} className="column" onClick={this.handleClick}>
                {expense.date}
                <input id={`edit-date-${expense.id}`}
                  type="date"
                  value={this.state.date}
                  className="hide"
                  onChange={this.handleKeyPress}
                />
              </div>
              <div id={`category-${expense.id}`} className="column" onClick={this.handleClick}>
                {expense.category}
                <input id={`edit-category-${expense.id}`}
                  type="text"
                  value={this.state.category}
                  className="hide"
                  onChange={this.handleKeyPress}
                />
              </div>
              <div id={`name-${expense.id}`} className="column" onClick={this.handleClick}>
                {expense.name}
                <input id={`edit-name-${expense.id}`}
                  type="text"
                  value={this.state.name}
                  className="hide"
                  onChange={this.handleKeyPress}
                />
              </div>
              <div id={`amount-${expense.id}`} className="column" onClick={this.handleClick}>
                {expense.amount}
                <input id={`edit-amount-${expense.id}`}
                  type="text"
                  value={this.state.amount}
                  className="hide"
                  onChange={this.handleKeyPress}
                />
              </div>
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