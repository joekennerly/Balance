import React, { Component } from "react"

export default class Totals extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="ui two column grid">
          <h1 className="column">income total:</h1>
          <h1 className="column">expense total:</h1>
        </div>
      </React.Fragment>
    )
  }
}
