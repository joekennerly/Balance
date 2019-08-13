import React, { Component } from "react"
import { Dropdown, Button, Form } from "semantic-ui-react"

export default class EntryForm extends Component {
  state = {
    date: "",
    category_id: "",
    name: "",
    amount: ""
  }
  //Load current date
  componentDidMount() {
    const stateToChange = {}
    stateToChange.date = this.props.date
    this.setState(stateToChange)
  }
  //Save current value when changed
  handleFieldChange = event => {
    const stateToChange = {}
    stateToChange[event.target.id] = event.target.value
    this.setState(stateToChange)
  }
  //creat obj to Submit
  handleClick = () => {
    let newObj = {
      date: this.state.date,
      category_id: +document.querySelector("#category").value,
      name: this.state.name,
      amount: this.state.amount,
      user_id: +sessionStorage.getItem("activeUser")
    }
    document.querySelector("#name").value = ""
    document.querySelector("#amount").value = ""
    this.props.addItem("expenses", newObj)
    this.props.updateChart()
  }
  render() {
    return (
      <Form>
        <Form.Group width="equal">
          <Form.Input
            fluid
            id="date"
            type="date"
            value={this.props.date}
            onChange={this.handleFieldChange}
          />
          <Dropdown
            compact
            text="Category"
            id="category"
            onChange={this.handleFieldChange}
          />
          <Dropdown.Menu>
            {this.props.categories.map(category => (
              <Dropdown.Item key={category.id} value={category.id} text={category.name}/>
            ))}
          </Dropdown.Menu>
          <Form.Input
            fluid
            id="name"
            type="text"
            onChange={this.handleFieldChange}
            placeholder="name"
          />
          <Form.Input
            fluid
            id="amount"
            type="text"
            onChange={this.handleFieldChange}
            placeholder="amount"
          />
        </Form.Group>
        <Button primary onClick={this.handleClick}>
          +
        </Button>
      </Form>
    )
  }
}
