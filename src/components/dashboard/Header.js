import React, { Component } from "react"

export default class Header extends Component {
  handleClick = () => {
    sessionStorage.clear()
    this.props.history.push("/login")
  }

  render() {
    console.log(this.props)
    return (
      <React.Fragment>
        <div className="column">
          <i className="balance scale icon large" />
          <h1 className="ui header">Balance</h1>
        </div>

        <div className="column">
          <button className="ui column button" onClick={this.handleClick}>
            Logout
          </button>
        </div>
      </React.Fragment>
    )
  }
}
