import React, { Component } from "react"
import { Grid, Button, Input } from "semantic-ui-react"

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
    this.props.updateChart()
  }
  render() {
    return (
      <React.Fragment>
        <Grid.Column>
          <Input
            id="date"
            type="date"
            value={this.props.date}
            onChange={this.handleFieldChange}
          />
        </Grid.Column>
        <Grid.Column>
          <select
            id="category"
            onChange={this.handleFieldChange}
            className="ui dropdown"
          >
            {this.props.categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </Grid.Column>
        <Grid.Column>
          <Input
            id="name"
            type="text"
            onChange={this.handleFieldChange}
            placeholder="name"
          />
        </Grid.Column>
        <Grid.Column>
          <Input
            id="amount"
            type="text"
            onChange={this.handleFieldChange}
            placeholder="amount"
          />
        </Grid.Column>
        <Button primary onClick={this.handleClick}>
          +
        </Button>
      </React.Fragment>
    )
  }
}
