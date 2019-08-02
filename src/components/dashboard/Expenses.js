import React, { Component } from "react"
import EntryForm from "./EntryForm"
// import Menu from '../menu/Menu'

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

  toggleClick = event => {
    // if not an INPUT...
    if (event.target.tagName !== "INPUT") {

      //only previously toggled forms will have a "show/toggle" class
      let toggledForm = document.querySelector(".show")
      let toggledText = document.querySelector(".toggled")
      //if there is an element with "show/toggled" class...
      if (toggledForm) {
        // toggle it back
        toggledForm.classList.toggle("hide")
        toggledText.classList.toggle("hide")
        // and remove temporary class
        toggledForm.classList.remove("show")
        toggledText.classList.remove("toggled")
      }

      //selectable elements will include "-"
      if (event.target.id.includes("-")) {
        //grab the num from a two element array
        let id = +event.target.id.split("-")[1]
        //hide text; add "toggled" class
        event.target.classList.toggle("hide")
        // add temporary class
        event.target.classList.add("toggled")
        //when TEXT is clicked
        let editable = document.querySelector(`#edit-${event.target.id}`)
        console.log(editable)
        editable.classList.toggle("hide")
        //show edit form
        editable.classList.add("show")
        //find the object with matching id from this.props
        let upObj = this.props.expenses.find(expense => expense.id === id)
        //update state with current values
        this.setState(upObj)
      }
    }
  }

  enterKey = event => {
    if (event.key === "Enter") {
      event.target.classList.toggle("hide")
      let eventId = +event.target.id.split("-")[2]
      return this.props.updateItem("expenses", eventId, this.state, "/")
    }
  }

  render() {
    // console.log(this.state)
    return (
      <React.Fragment>
        <section
          className="expenses ui six column grid"
          onClick={this.toggleClick}
        >
          {/* <Menu /> //This is where a menu could go */}
          <div className="row card">
            <EntryForm {...this.props} />
          </div>

          {this.props.expenses.map(expense => (
            <div key={expense.id} className="row card">
              <div className="column ui input">
                <div id={`type-${expense.id}`}>"expense"</div>
                <select
                  id={`edit-type-${expense.id}`}
                  type="text"
                  value={this.state.category}
                  className="hide"
                  onChange={this.handleKeyPress}
                  onKeyPress={this.enterKey}
                >
                  <option>income</option>
                  <option>expense</option>
                </select>
              </div>
              <div className="column ui input">
                <div id={`date-${expense.id}`}>{expense.date}</div>
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
                <div id={`category-${expense.id}`}>{expense.category}</div>
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
                <div id={`name-${expense.id}`}>{expense.name}</div>
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
                <div id={`amount-${expense.id}`}>{expense.amount}</div>
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
