import React, { Component } from "react"

export default class Header extends Component {

  handleClick = () => {
    return sessionStorage.clear()
  }

  render() {
    return (
      <React.Fragment>
        <h1 className="ui header">
          <i className="balance scale icon" />
          Balance
        </h1>
        <button
          className="ui button"
          onClick={this.handleClick}
        >Logout</button>
      </React.Fragment>
    )
  }
}
