import React, { Component } from "react"
import EntryForm from "./EntryForm"
// import APIManager from "../../modules/APIManager"

export default class Expenses extends Component {
  state = {
    date: "",
    category: "",
    name: "",
    amount: ""
  }

  //Save current value when changed
  handleKeyPress = event => {
    // console.log(event.target.id.split("-")[1])
    const stateToChange = {}
    stateToChange[event.target.id.split("-")[1]] = event.target.value
    this.setState(stateToChange)
  }

  handleClick = event => {
    if (!event.target.id.startsWith("edit")) {
      //show edit form when text is clicked
      let eventId = +event.target.id.split("-")[1]
      event.target.children[0].classList.toggle("hide")
      //find the object with matching id from this.props
      let upObj = this.props.expenses.find(expense => expense.id === eventId)
      //update state with current values
      this.setState(upObj)
    } else {
      //Do nothing if edit-input is clicked
      event.preventDefault()
    }
  }

  enterKey = (event) => {
    if (event.key === "Enter") {
      console.log(this.state)
      // console.log("enter", +event.target.id.split("-")[2])
      let eventId = +event.target.id.split("-")[2]
      // let updatedObject = {}
      return this.props.updateItem("expenses", eventId, this.state, "/dashboard")
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
              <div
                id={`date-${expense.id}`}
                className="column"
                onClick={this.handleClick}
              >
                {expense.date}
                <input
                  id={`edit-date-${expense.id}`}
                  type="date"
                  placeholder={expense.date}
                  className="hide"
                  onChange={this.handleKeyPress}
                  onKeyPress={this.enterKey}
                />
              </div>
              <div
                id={`category-${expense.id}`}
                className="column"
                onClick={this.handleClick}
              >
                {expense.category}
                <input
                  id={`edit-category-${expense.id}`}
                  type="text"
                  placeholder={expense.category}
                  className="hide"
                  onChange={this.handleKeyPress}
                  onKeyPress={this.enterKey}
                />
              </div>
              <div
                id={`name-${expense.id}`}
                className="column"
                onClick={this.handleClick}
              >
                {expense.name}
                <input
                  id={`edit-name-${expense.id}`}
                  type="text"
                  placeholder={expense.name}
                  className="hide"
                  onChange={this.handleKeyPress}
                  onKeyPress={this.enterKey}
                />
              </div>
              <div
                id={`amount-${expense.id}`}
                className="column"
                onClick={this.handleClick}
              >
                {expense.amount}
                <input
                  id={`edit-amount-${expense.id}`}
                  type="text"
                  placeholder={expense.amount}
                  className="hide"
                  onChange={this.handleKeyPress}
                  onKeyPress={this.enterKey}
                />
              </div>
              <button
                className="ui button"
                onClick={() =>
                  this.props.deleteItem("expenses", expense.id, "/dashboard")
                }
              >
                x
              </button>
            </div>
          ))}
        </section>
      </React.Fragment>
    )
  }
}
