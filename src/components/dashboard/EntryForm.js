import React, { Component } from "react"

export default class EntryForm extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="ui big form">
          <div className="three fields">
            <div className="field"><input type="text" autoFocus placeholder="expense" /></div>
            <div className="field"><input type="text" placeholder="amount" /></div>
            <div className="field"><input type="date" placeholder="date" /></div>
            <button className="ui button">
              <i className="plus icon" />
            </button>
          </div>
        </div>
      </React.Fragment>
    )
  }
}
