import React, { Component } from "react"
import {
  Button,
  Header,
  Segment,
  Table,
  Icon
} from "semantic-ui-react"

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
  del = id => {
    this.props.deleteItem("categories", id).then(() => this.props.updateChart())
  }
  render() {
    return (
      <Segment>
        <Segment inverted>
          <Header inverted size="huge">
            Current Balance:{" "}
            {this.props.diff(
              this.props.sum(this.props.income),
              this.props.sum(this.props.expenses)
            )}
          </Header>
            <Icon name="plus circle"/>
        </Segment>
        {/* <Input
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
        <Button onClick={this.addAndClose}>+ Add Budget</Button> */}

        {this.props.categories.map(category => (
          <Table inverted key={category.id}>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>
                  <Header size="large" inverted id={`name-${category.id}`}>
                    {category.name}
                  </Header>
                </Table.HeaderCell>
                <Table.HeaderCell>
                  <Header size="large" inverted id={`amount-${category.id}`}>
                    $
                    {this.props.sum(
                      this.props.expenses.filter(
                        exp => exp.category_id === category.id
                      )
                    )}
                    /${category.amount}
                  </Header>
                </Table.HeaderCell>
                <Table.HeaderCell />
                <Table.HeaderCell>
                    <Button
                    positive
                    circular
                      size="tiny"
                      id={`category-${category.id}`}
                      onClick={() => this.del(category.id)}
                    />
                    <Button
                    negative
                    circular
                      size="tiny"
                      id={`category-${category.id}`}
                      onClick={() => this.del(category.id)}
                    />

                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {this.props.expenses
                .filter(expenses => expenses.category_id === category.id)
                .map(expense => (
                  <Table.Row key={expense.id}>
                    <Table.Cell>
                      ${expense.amount}
                    </Table.Cell>
                    <Table.Cell>
                      - {expense.name}
                    </Table.Cell>
                    <Table.Cell>
                        {expense.date}
                    </Table.Cell>
                    <Table.Cell>
                        <Button basic circular positive size="mini"></Button>
                        <Button basic circular negative size="mini"></Button>
                    </Table.Cell>
                  </Table.Row>
                ))}
            </Table.Body>
          </Table>
        ))}
      </Segment>
    )
  }
}
