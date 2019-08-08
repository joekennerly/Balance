import React, { Component } from "react"
import { Grid, Button, Input, Label } from "semantic-ui-react"

export default class EntryForm extends Component {
  state = {
    date: "",
    name: "",
    amount: "",
    user_id: ""
  }

  componentWillMount = () => this.setState({
    user_id: this.props.activeUser
  })

  //Load current date and current category
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

  handleClick = () => {
    let obj = {}
    obj.amount = this.state.amount.toFixed(2)
    document.querySelector("#name").value = ""
    document.querySelector("#amount").value = ""
    this.setState(obj)
    this.props.addItem("income", this.state)
  }

  handleClick = () => {
    let newObj = {
      date: this.state.date,
      name: this.state.name,
      amount: this.state.amount,
      user_id: +sessionStorage.getItem("activeUser")
    }
    document.querySelector("#name").value = ""
    document.querySelector("#amount").value = ""
    this.props.addItem("income", newObj)
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
          onClick={this.handleClick}
        >
          +
        </Button>
      </React.Fragment>
    )
  }
}
