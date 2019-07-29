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
    APIManager.post("expenses", this.state)
    this.props.history.push("/")
  }

  render() {
    return (
      <React.Fragment>
        <div className="ui form">
          <div className="five fields">
            <div className="field">
              <input
                id="date"
                type="date"
                value={this.props.date}
                onChange={this.handleFieldChange}
              />
            </div>
            <div className="field">
              <select
                id="category"
                type="text"
                placeholder="category"
                onChange={this.handleFieldChange}
              >
                <option value="food">Food</option>
                <option value="utilities">Utilities</option>
                <option value="car">Car</option>
                <option value="health">Health</option>
              </select>
            </div>
            <div className="field">
              <input
                id="name"
                type="text"
                onChange={this.handleFieldChange}
                placeholder="expense"
              />
            </div>
            <div className="field">
              <input
                id="amount"
                type="text"
                onChange={this.handleFieldChange}
                placeholder="amount"
              />
            </div>
            <button className="ui button" onClick={this.handleClick}>
              <i className="plus icon" />
            </button>
          </div>
        </div>
      </React.Fragment>
    )
  }
}
