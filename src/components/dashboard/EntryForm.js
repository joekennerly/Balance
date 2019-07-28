import React, { Component } from "react"

export default class EntryForm extends Component {

  state = {
    date: "",
    category: "",
    name: "",
    amount: ""
  }

  handleFieldChange = event => {
    const stateToChange = {}
    stateToChange[event.target.id] = event.target.value
    this.setState(stateToChange)
  }

  handleClick = () => {
    console.log(this.state)
  }

  render() {
    return (
      <React.Fragment>
        <div className="ui form">
          <div className="three fields">
            <div className="field">
              <input
                id="date"
                type="date"
                onChange={this.handleFieldChange}
                placeholder="date" />
            </div>
            <div className="field">
              <input
                id="category"
                type="text"
                onChange={this.handleFieldChange}
                placeholder="category" />
            </div>
            <div className="field">
              <input
                id="name"
                type="text"
                onChange={this.handleFieldChange}
                autoFocus placeholder="expense" />
            </div>
            <div className="field">
              <input
                id="amount"
                type="text"
                onChange={this.handleFieldChange}
                placeholder="amount" />
            </div>
            <button
              className="ui button"
              onClick={this.handleClick}
            >
              <i className="plus icon" />
            </button>
          </div>
        </div>
      </React.Fragment>
    )
  }
}
