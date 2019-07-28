import React, { Component } from "react"

export default class Totals extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="ui three column grid">
          <div className="column"><h1>income total: $1000</h1></div>
          <div className="column"><h1>expense total: $20</h1></div>
          <div className="column"><h1>balance total: $20</h1></div>
        </div>
      </React.Fragment>
    )
  }
}
