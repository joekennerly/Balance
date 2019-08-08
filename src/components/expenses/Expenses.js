import React, { Component } from "react"
import EntryForm from "../dashboard/EntryForm"
import Menu from "../menu/Menu"
import BudgetTotals from "./BudgetTotals"
import { Grid, Button } from "semantic-ui-react"

export default class Expenses extends Component {
  state = {
    date: "",
    category_id: "",
    name: "",
    amount: ""
  }
  //Save current value when changed
  handleKeyPress = event => {
    console.log(event)
    const stateToChange = {}
    stateToChange[event.target.id.split("-")[1]] = event.target.value
    this.setState(stateToChange)
  }
  handleSelect = event => {
    console.log(event)
    const stateToChange = {}
    stateToChange[event.target.id] = event.target.value
    this.setState(stateToChange)
  }
  toggleClick = event => {
    // if not an INPUT...
    if (event.target.tagName !== "INPUT" && event.target.tagName !== "SELECT") {
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
        //hide text
        event.target.classList.toggle("hide")
        // add temporary class to specify a previous toggled element
        event.target.classList.add("toggled")
        //when TEXT is clicked
        let editable = document.querySelector(`#edit-${event.target.id}`)
        if (editable) {
          editable.classList.toggle("hide")
          //show edit form
          editable.classList.add("show")
        }
        //find the object with matching id from this.props
        let upObj = this.props.expenses.find(expense => expense.id === id)
        //update state with current values
        this.setState(upObj)
      }
    }
  }
  enterKey = event => {
    if (event.key === "Enter") {
      event.preventDefault()
      let hiddenId = event.target.id.split("-")
      let hiddenText = document.querySelector(`#${hiddenId[1]}-${hiddenId[2]}`)
      hiddenText.classList.toggle("hide")
      hiddenText.classList.remove("toggled")
      event.target.classList.toggle("hide")
      event.target.classList.remove("show")
      let eventId = +event.target.id.split("-")[2]
      return this.props.updateItem("expenses", eventId, this.makeObj())
    }
  }
  //Factory function
  makeObj = () => {
    return {
      date: this.state.date,
      category_id: this.state.category_id,
      name: this.state.name,
      amount: this.state.amount,
      user_id: +sessionStorage.getItem("activeUser")
    }
  }
  render() {
    console.log("exp render",this.state)
    return (
      <React.Fragment>
        <BudgetTotals {...this.props} />
        <Menu {...this.props} />
        <Grid columns={5} onClick={this.toggleClick}>
          <Grid.Row>
            <EntryForm {...this.props} />
          </Grid.Row>
          {this.props.expenses.map(expense => (
            <Grid.Row key={expense.id}>
              <Grid.Column textAlign="center">
                <div id={`date-${expense.id}`}>{expense.date}</div>
                <input
                  id={`edit-date-${expense.id}`}
                  type="date"
                  value={this.state.date}
                  className="hide"
                  onChange={this.handleKeyPress}
                  onKeyPress={this.enterKey}
                />
              </Grid.Column>
              <Grid.Column textAlign="center">
                <div id={`category-${expense.id}`}>
                  {
                    this.props.categories.find(
                      category => category.id === expense.category_id
                    ).name
                  }
                </div>
                <select
                  id={`edit-category-${expense.id}`}
                  value={this.state.category_id}
                  className="hide"
                  // onChange={this.handleSelect}
                  onChange={(e) => this.setState({category_id : +e.target.value})}
                  onSelect={(val) => this.setState({category_id : val})}
                  onKeyPress={this.enterKey}
                >
                  {this.props.categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </Grid.Column>
              <Grid.Column textAlign="center">
                <div id={`name-${expense.id}`}>{expense.name}</div>
                <input
                  id={`edit-name-${expense.id}`}
                  type="text"
                  value={this.state.name}
                  className="hide"
                  onChange={this.handleKeyPress}
                  onKeyPress={this.enterKey}
                />
              </Grid.Column>
              <Grid.Column textAlign="center">
                <div id={`amount-${expense.id}`}>{expense.amount}</div>
                <input
                  id={`edit-amount-${expense.id}`}
                  type="text"
                  value={this.state.amount}
                  className="hide"
                  onChange={this.handleKeyPress}
                  onKeyPress={this.enterKey}
                />
              </Grid.Column>
              <Button
                onClick={() => this.props.deleteItem("expenses", expense.id)}
              >
                x
              </Button>
            </Grid.Row>
          ))}
        </Grid>
      </React.Fragment>
    )
  }
}
