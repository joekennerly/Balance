import React, { Component } from "react"
import APIManager from "../../modules/APIManager"

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
    // Post to db
    APIManager.post("expenses", this.state).then(() =>
      this.props.history.push("/")
    )
  }

  render() {
    return (
      <React.Fragment>
        <div className="column ui input">
          <input
            id="date"
            type="date"
            value={this.props.date}
            onChange={this.handleFieldChange}
          />
        </div>
        <div className="column ui input">
          <select
            id="category"
            type="text"
            placeholder="category"
            value={this.props.category}
            onChange={this.handleFieldChange}
            className="ui dropdown"
          >
            <option value="food">Food</option>
            <option value="utilities">Utilities</option>
            <option value="car">Car</option>
            <option value="health">Health</option>
          </select>
        </div>
        <div className="column ui input">
          <input
            id="name"
            type="text"
            onChange={this.handleFieldChange}
            placeholder="name"
            value={this.props.name}
          />
        </div>
        <div className="column ui input">
          <input
            id="amount"
            type="text"
            onChange={this.handleFieldChange}
            placeholder="amount"
            value={this.props.amount}
          />
        </div>
        <button
          className="ui button"
          onClick={() =>
            this.props.addItem("expenses", this.state, "/dashboard")
          }
        >
          +
        </button>
      </React.Fragment>
    )
  }
}
