import React, { Component } from "react"
import Categories from "../form/Categories"
import { Grid, Button, Input, Label } from "semantic-ui-react"

export default class EntryForm extends Component {
  state = {
    date: "",
    category: "",
    name: "",
    amount: ""
  }

  //Load current date and current category
  componentDidMount() {
    const stateToChange = {}
    stateToChange.date = this.props.date
    stateToChange.category = document.querySelector("#category").value
    this.setState(stateToChange)
  }
  //Save current value when changed
  handleFieldChange = event => {
    const stateToChange = {}
    stateToChange[event.target.id] = event.target.value
    this.setState(stateToChange)
  }
  //Handle Submit
  handleClick = () => {
    let obj = {}
    obj.amount = this.state.amount.toFixed(2)
    this.setState(obj)
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
            type="text"
            placeholder="category"
            value={this.props.category}
            onChange={this.handleFieldChange}
            className="ui dropdown"
          >
            <Categories categories={this.props.categories} />
          </select>
        </Grid.Column>
        <Grid.Column>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            type="text"
            onChange={this.handleFieldChange}
            placeholder="name"
            value={this.props.name}
          />
        </Grid.Column>
        <Grid.Column>
          <Label htmlFor="amount">Amount</Label>
          <Input
            id="amount"
            type="text"
            onChange={this.handleFieldChange}
            placeholder="amount"
            value={this.props.amount}
          />
        </Grid.Column>
        <Button
          className="teal"
          onClick={() =>
            this.props.addItem("expenses", this.state, "/expenses")
          }
        >
          +
        </Button>
        <Button>
          Manage Categories
        </Button>
      </React.Fragment>
    )
  }
}
