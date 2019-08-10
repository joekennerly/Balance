import React, { Component } from "react"
import { Grid, Button, Input, Label } from "semantic-ui-react"

export default class EntryForm extends Component {
  state = {
    date: "",
    category_id:"",
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
  }
  render() {
    return (
      <React.Fragment>
        <Grid.Column>
          <Label htmlFor="date">Date</Label>
          <Input
            id="date"
            type="date"
            value={this.props.date}
            onChange={this.handleFieldChange}
          />
        </Grid.Column>
        <Grid.Column>
          <Label htmlFor="category">Category</Label>
          <select
            id="category"
            onChange={this.handleFieldChange}
          >
            {this.props.categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </Grid.Column>
        <Grid.Column>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            type="text"
            onChange={this.handleFieldChange}
            placeholder="name"
          />
        </Grid.Column>
        <Grid.Column>
          <Label htmlFor="amount">Amount</Label>
          <Input
            id="amount"
            type="text"
            onChange={this.handleFieldChange}
            placeholder="amount"
          />
        </Grid.Column>
        <Button className="teal" onClick={this.handleClick}>
          +
        </Button>
      </React.Fragment>
    )
  }
}
