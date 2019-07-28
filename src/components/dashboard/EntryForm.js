import React, { Component } from "react"

export default class EntryForm extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="ui input grid">
          <h2 className="ui header">Enter an income </h2>
          <input type="text" autoFocus placeholder="name" />
          <input type="text" placeholder="amount" />
          <input type="date" placeholder="date" />
          <button className="ui button">
            <i className="plus icon" />
          </button>
        </div>
        <div className="ui input grid">
          <h2 className="ui header">Enter an expense </h2>
          <input type="text" autoFocus placeholder="name" />
          <input type="text" placeholder="amount" />
          <input type="date" placeholder="date" />
          <button className="ui button">
            <i className="plus icon" />
          </button>
        </div>
      </React.Fragment>
    )
  }
}
