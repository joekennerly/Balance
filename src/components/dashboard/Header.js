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
        <div id="ui two column grid">
          <div className="column">
            <h1 className="ui header">
              <i className="balance scale icon" />
              Balance
            </h1>
          </div>
          <div className="column">
            <button className="ui column button" onClick={this.handleClick}>
              Logout
            </button>
          </div>
        </div>
      </React.Fragment>
    )
  }
}
