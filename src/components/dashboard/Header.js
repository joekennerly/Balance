import React, { Component } from "react"

export default class Header extends Component {
  render() {
    return (
      <React.Fragment>
        <h1 className="ui header">
          <i className="balance scale icon" />
          Balance
        </h1>
      </React.Fragment>
    )
  }
}
