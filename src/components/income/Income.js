import React, { Component } from "react"
import { Button, Header, Segment, Table, Icon } from "semantic-ui-react"

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
      this.props
        .updateItem("income", eventId, this.makeObj())
        .then(() => this.props.updateChart())
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
      <Segment.Group
        as={Segment}
        inverted
        horizontal
        onClick={this.toggleClick}
      >
        <Segment inverted textAlign="right">
          {this.props.income.map(inco => (
            <Table inverted key={inco.id}>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell textAlign="center">
                    <Header size="large" inverted id={`name-${inco.id}`}>
                      {inco.name}
                    </Header>
                    <input
                      id={`edit-name-${inco.id}`}
                      type="text"
                      value={this.state.name}
                      className="hide"
                      onChange={this.handleKeyPress}
                      onKeyPress={this.enterKey}
                    />
                  </Table.HeaderCell>
                  <Table.HeaderCell textAlign="center">
                    <Header size="large" inverted id={`amount-${inco.id}`}>
                      {inco.amount}
                    </Header>
                    <input
                      id={`edit-amount-${inco.id}`}
                      type="text"
                      value={this.state.amount}
                      className="hide"
                      onChange={this.handleKeyPress}
                      onKeyPress={this.enterKey}
                    />
                  </Table.HeaderCell>
                  <Table.HeaderCell>
                    <Icon
                      as={Button}
                      circular
                      negative
                      size="mini"
                      name="times"
                      onClick={() =>
                        this.props
                          .deleteItem("income", inco.id)
                          .then(() => this.props.updateChart())
                      }
                    />
                  </Table.HeaderCell>
                </Table.Row>
                <Table.Row id={`date-${inco.id}`}>
                  <Table.Cell>
                    {inco.date}
                    <input
                      id={`edit-date-${inco.id}`}
                      type="date"
                      value={this.state.date}
                      className="hide"
                      onChange={this.handleKeyPress}
                      onKeyPress={this.enterKey}
                    />
                  </Table.Cell>
                </Table.Row>
              </Table.Header>
            </Table>
          ))}
        </Segment>
      </Segment.Group>
    )
  }
}
