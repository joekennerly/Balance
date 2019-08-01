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
    const stateToChange = {}
    stateToChange[event.target.id.split("-")[1]] = event.target.value
    this.setState(stateToChange)
  }

  handleClick = event => {
    let id = +event.target.id.split("-")[1]
    //show edit form when TEXT is clicked
    document.querySelector(`#edit-${event.target.id}`).classList.toggle("hide")

    //hide text
    event.target.classList.toggle("hide")

    //find the object with matching id from this.props
    let upObj = this.props.expenses.find(expense => expense.id === id)
    //update state with current values
    this.setState(upObj)

    /*if (!event.target.id.startsWith("edit")) {

    } */
  }

  enterKey = event => {
    if (event.key === "Enter") {
      event.target.classList.toggle("hide")
      let eventId = +event.target.id.split("-")[2]
      return this.props.updateItem("expenses", eventId, this.state, "/")
    }
  }

  render() {
    console.log(this.state)
    return (
      <React.Fragment>
        <section className="expenses ui five column grid">
          <div className="ui tabular menu">
            <div className="active item">
              All
            </div>
            <div className="item">
              Year
            </div>
            <div className="item">
              Quarter
            </div>
            <div className="item">
              Month
            </div>
            <div className="item">
              Week
            </div>
            <div className="right menu">
              <div className="item">
                <div className="ui icon input">
                  <input type="text" placeholder="Search..." />
                  <i className="search icon" />
                </div>
              </div>
            </div>
          </div>
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
              <div className="column ui input">
                <div id={`date-${expense.id}`} onClick={this.handleClick}>
                  {expense.date}
                </div>
                <input
                  id={`edit-date-${expense.id}`}
                  type="date"
                  value={this.state.date}
                  className="hide"
                  onChange={this.handleKeyPress}
                  onKeyPress={this.enterKey}
                />
              </div>
              <div className="column ui input">
                <div id={`category-${expense.id}`} onClick={this.handleClick}>
                  {expense.category}
                </div>
                <input
                  id={`edit-category-${expense.id}`}
                  type="text"
                  value={this.state.category}
                  className="hide"
                  onChange={this.handleKeyPress}
                  onKeyPress={this.enterKey}
                />
              </div>
              <div className="column ui input">
                <div id={`name-${expense.id}`} onClick={this.handleClick}>
                  {expense.name}
                </div>
                <input
                  id={`edit-name-${expense.id}`}
                  type="text"
                  value={this.state.name}
                  className="hide"
                  onChange={this.handleKeyPress}
                  onKeyPress={this.enterKey}
                />
              </div>
              <div className="column ui input">
                <div id={`amount-${expense.id}`} onClick={this.handleClick}>
                  {expense.amount}
                </div>
                <input
                  id={`edit-amount-${expense.id}`}
                  type="text"
                  value={this.state.amount}
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
