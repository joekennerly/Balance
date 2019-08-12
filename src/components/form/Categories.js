import React, { Component } from "react"
import EntryForm from "../dashboard/EntryForm"
import { Button, Input, Header, Segment, Accordion } from "semantic-ui-react"

export default class Categories extends Component {
  state = {
    name: "",
    amount: "",
    activeIndex: 0
  }
  toggleClick = event => {
    // if not an INPUT...
    if (event.target.tagName !== "INPUT") {
      //only previously toggled forms will have a "show/toggle" class
      let toggledForm = document.querySelector(".show")
      let toggledText = document.querySelector(".toggled")
      //if there is an element with "show/toggled" class...
      if (toggledForm) {
        toggledForm.setAttribute("autoFocus", false)
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
        if (editable) {
          editable.setAttribute("autoFocus", true)
          editable.classList.toggle("hide")
          //show edit form
          editable.classList.add("show")
        }
        //find the object with matching id from this.props
        let upObj = this.props.categories.find(category => category.id === id)
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
      return this.props
        .updateItem("categories", eventId, this.makeObj())
        .then(() => this.props.updateChart())
    }
  }

  handleClick = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index

    this.setState({ activeIndex: newIndex })
  }

  //Save current value when changed
  handleKeyPress = event => {
    const stateToChange = {}
    stateToChange[event.target.id] = event.target.value
    this.setState(stateToChange)
  }
  handleEdit = event => {
    const stateToChange = {}
    stateToChange[event.target.id.split("-")[1]] = event.target.value
    this.setState(stateToChange)
  }
  //Factory function
  makeObj = () => {
    return {
      name: this.state.name,
      amount: this.state.amount,
      user_id: +sessionStorage.getItem("activeUser")
    }
  }
  // ADD / Delete
  addAndClose = () => {
    if (this.state.name === "") {
      return window.alert("please enter a name")
    } else if (this.state.amount === "") {
      return window.alert("please enter an amount")
    } else {
      this.props
        .addItem("categories", this.makeObj())
        .then(() => this.props.updateChart())
    }
  }
  del = e =>
    this.props
      .deleteItem("categories", e.target.id.split("-")[1])
      .then(() => this.props.updateChart())

  render() {
    console.log(this.props.expenses.filter(exp => exp.category_id === 22))

    return (
      <Segment onClick={this.toggleClick}>
        <Segment>
          <Header>
            Budget Remainder:{" "}
            {this.props.diff(
              this.props.sum(this.props.income),
              this.props.sum(this.props.categories)
            )}
          </Header>
        </Segment>

        <EntryForm {...this.props} />

        <Accordion>
          {this.props.categories.map(category => (
            <Segment inverted key={category.id}>
              <Accordion.Title
                active={this.state.activeIndex === category.id}
                index={category.id}
                onClick={this.handleClick}
              >
                <Segment.Group horizontal>
                  <Segment textAlign="center">
                    <Header id={`name-${category.id}`}>{category.name}</Header>
                    <input
                      id={`edit-name-${category.id}`}
                      type="text"
                      value={this.state.name}
                      className="hide"
                      onChange={this.handleEdit}
                      onKeyPress={this.enterKey}
                    />
                  </Segment>
                  <Segment textAlign="center">
                    <Header id={`amount-${category.id}`}>
                      $
                      {this.props.sum(
                        this.props.expenses.filter(
                          exp => exp.category_id === category.id
                        )
                      )}
                      /${category.amount}
                    </Header>
                    <input
                      id={`edit-amount-${category.id}`}
                      type="number"
                      value={this.state.amount}
                      className="hide"
                      onChange={this.handleEdit}
                      onKeyPress={this.enterKey}
                    />
                  </Segment>
                  <Button
                    as={Segment}
                    id={`category-${category.id}`}
                    onClick={this.del}
                  >
                    x
                  </Button>
                </Segment.Group>
              </Accordion.Title>
              <Accordion.Content
                active={this.state.activeIndex === category.id}
              >
                {this.props.expenses
                  .filter(expenses => expenses.category_id === category.id)
                  .map(expense => (
                    <Segment.Group horizontal key={expense.id}>
                      <Segment>{expense.date}</Segment>
                      <Segment>{expense.name}</Segment>
                      <Segment>{expense.amount}</Segment>
                      <Button as={Segment}>x</Button>
                    </Segment.Group>
                  ))}
              </Accordion.Content>
            </Segment>
          ))}
        </Accordion>
        <Input
          autoFocus
          id="name"
          placeholder="name"
          onChange={this.handleKeyPress}
        />
        <Input
          id="amount"
          type="number"
          placeholder="amount"
          onChange={this.handleKeyPress}
        />
        <Button onClick={this.addAndClose}>+ Add Budget</Button>
      </Segment>
    )
  }
}
