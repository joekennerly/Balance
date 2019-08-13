import React, { Component } from "react"
import { Button, Input, Segment } from "semantic-ui-react"

export default class EntryForm extends Component {
  state = {
    date: "",
    name: "",
    amount: "",
    user_id: ""
  }

  componentWillMount = () =>
    this.setState({
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
    let newObj = {
      date: this.state.date,
      name: this.state.name,
      amount: this.state.amount,
      user_id: +sessionStorage.getItem("activeUser")
    }
    document.querySelector("#name").value = ""
    document.querySelector("#amount").value = ""
    this.props.addItem("income", newObj).then(()=>this.props.updateChart())
  }

  render() {
    return (
      <Segment.Group horizontal>
        <Input
          as={Segment}
          id="date"
          type="date"
          value={this.props.date}
          onChange={this.handleFieldChange}
        />
        <Input
          as={Segment}
          id="name"
          type="text"
          onChange={this.handleFieldChange}
          placeholder="name"
          value={this.props.name}
        />
        <Input
          as={Segment}
          id="amount"
          type="text"
          onChange={this.handleFieldChange}
          placeholder="amount"
          value={this.props.amount}
        />
        <Button primary onClick={this.handleClick}>
          +
        </Button>
      </Segment.Group>
    )
  }
}
