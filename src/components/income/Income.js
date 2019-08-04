import React, { Component } from "react"
import IncomeForm from "./IncomeForm"
import { Grid, Button } from 'semantic-ui-react'

export default class Income extends Component {
  state = {
    date: "",
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
        let editable = document.getElementById(`edit-${event.target.id}`)
        editable.classList.toggle("hide")
        //show edit form; show class is just a marker
        editable.classList.add("show")

        //I WANT TO SELECT THE INPUT TEXT
        let editableValue = editable.value
        console.log(editableValue)
        editableValue.focus()
        editableValue.select()

        //find the object with matching id from this.props
        let upObj = this.props.income.find(inco => inco.id === id)
        //update state with current values
        this.setState(upObj)
      }
    }
  }
  enterKey = event => {
    if (event.key === "Enter") {
      event.target.classList.toggle("hide")
      let eventId = +event.target.id.split("-")[2]
      return this.props.updateItem("income", eventId, this.state, "/income")
    }
  }

  render() {
    return (
      <React.Fragment>
        <Grid
          columns={4}
          className="entry-list"
          onClick={this.toggleClick}
        >
          <Grid.Row>
            <IncomeForm {...this.props} />
          </Grid.Row>
          {this.props.income.map(inco => (
            <Grid.Row key={inco.id} className="row card">
              <Grid.Column textAlign="center">
                <div id={`date-${inco.id}`}>{inco.date}</div>
                <input
                  id={`edit-date-${inco.id}`}
                  type="date"
                  value={this.state.date}
                  className="hide"
                  onChange={this.handleKeyPress}
                  onKeyPress={this.enterKey}
                />
              </Grid.Column>
              <Grid.Column textAlign="center">
                <div id={`name-${inco.id}`}>{inco.name}</div>
                <input
                  id={`edit-name-${inco.id}`}
                  type="text"
                  value={this.state.name}
                  className="hide"
                  onChange={this.handleKeyPress}
                  onKeyPress={this.enterKey}
                />
              </Grid.Column>
              <Grid.Column textAlign="center">
                <div id={`amount-${inco.id}`}>{inco.amount}</div>
                <input
                  id={`edit-amount-${inco.id}`}
                  type="text"
                  value={this.state.amount}
                  className="hide"
                  onChange={this.handleKeyPress}
                  onKeyPress={this.enterKey}
                />
              </Grid.Column>
              <Button
                onClick={() =>
                  this.props.deleteItem("income", inco.id, "/income")
                }
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
