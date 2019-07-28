import React, { Component } from "react"

export default class Login extends Component {

  handleClick = () => {
    console.log("clicked")
  }

  render() {
    return (
      <div>
        <h2>Login</h2>
        <div className="ui input">
          <input required type="text" autoFocus placeholder="username" />
          <input required type="text" placeholder="password" />
          <button
            className="ui button primary"
            onClick={this.handleClick}
          ></button>
        </div>
      </div>
    )
  }
}
