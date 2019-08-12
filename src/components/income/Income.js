import React, { Component } from "react"
import IncomeForm from "./IncomeForm"
import { Button, Header, Segment } from "semantic-ui-react"
import Totals from "../totals/Totals"

export default class Income extends Component {
  state = {
    date: "",
    name: "",
    amount: "",
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
        //find the object with matching id from this.props
        let upObj = this.props.income.find(inco => inco.id === id)
        //update state with current values
        this.setState(upObj)
      }
    }
  }
  enterKey = event => {
    if (event.key === "Enter") {
      let hiddenId = event.target.id.split("-")
      let hiddenText = document.querySelector(`#${hiddenId[1]}-${hiddenId[2]}`)
      hiddenText.classList.toggle("hide")
      hiddenText.classList.remove("toggled")
      event.target.classList.toggle("hide")
      event.target.classList.remove("show")
      let eventId = +event.target.id.split("-")[2]
      return this.props.updateItem("income", eventId, this.makeObj())
    }
  }
  //Factory function
  makeObj = () => {
    return {
      date: this.state.date,
      name: this.state.name,
      amount: this.state.amount,
      user_id: +sessionStorage.getItem("activeUser")
    }
  }

  render() {
    return (
      <React.Fragment>
        <Totals {...this.props} />

        <Segment.Group horizontal fluid onClick={this.toggleClick}>
          <Segment>Chart goes here</Segment>
          <Segment>
            {/* <Segment> */}
              <IncomeForm {...this.props} />
            {/* </Segment> */}
            {this.props.income.map(inco => (
              <Segment.Group horizontal key={inco.id}>
                <Segment textAlign="center">
                  <Header id={`date-${inco.id}`}>{inco.date}</Header>
                  <input
                    id={`edit-date-${inco.id}`}
                    type="date"
                    value={this.state.date}
                    className="hide"
                    onChange={this.handleKeyPress}
                    onKeyPress={this.enterKey}
                  />
                </Segment>
                <Segment textAlign="center">
                  <Header id={`name-${inco.id}`}>{inco.name}</Header>
                  <input
                    id={`edit-name-${inco.id}`}
                    type="text"
                    value={this.state.name}
                    className="hide"
                    onChange={this.handleKeyPress}
                    onKeyPress={this.enterKey}
                  />
                </Segment>
                <Segment textAlign="center">
                  <Header id={`amount-${inco.id}`}>{inco.amount}</Header>
                  <input
                    id={`edit-amount-${inco.id}`}
                    type="text"
                    value={this.state.amount}
                    className="hide"
                    onChange={this.handleKeyPress}
                    onKeyPress={this.enterKey}
                  />
                </Segment>
                  <Button
                    onClick={() => this.props.deleteItem("income", inco.id)}
                  >
                    x
                  </Button>
              </Segment.Group>
            ))}
          </Segment>
        </Segment.Group>
      </React.Fragment>
    )
  }
}
