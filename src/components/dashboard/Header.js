import React, { Component } from "react"

export default class Header extends Component {
  handleClick = () => {
    sessionStorage.clear()
    this.props.history.push("/login")
  }

  render() {
    return (
      <header>
        <button className="ui button" onClick={this.handleClick}>
          Logout
        </button>
      </header>
    )
  }
}
