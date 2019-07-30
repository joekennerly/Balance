import React, { Component } from "react"

export default class Header extends Component {
  handleClick = () => {
    sessionStorage.clear()
    this.props.history.push("/login")
  }

  render() {
    return (
      <header id="header">
        <h1>
          <i className="balance scale icon"></i>
          Balance
        </h1>
        <button className="ui column button" onClick={this.handleClick}>
          Logout
        </button>
      </header>
    )
  }
}
