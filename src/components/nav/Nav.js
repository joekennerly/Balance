import React, { Component } from "react"
import { Link } from "react-router-dom"

export default class Nav extends Component {
  handleClick = () => {
    sessionStorage.clear()
    this.props.history.push("/login")
  }

  render() {
    return (
      <header>
        <div className="ui top attached menu">

          <Link className="nav-link" to="/dashboard">
            <div className="ui dropdown icon item">
              <i className="bars icon" />
            </div>
          </Link>

          <Link className="nav-link" to="/budget">
            <div className="ui dropdown icon item">
              <i className="pie chart icon" />
            </div>
          </Link>

          <div className="ui right menu">
            <button className="ui button" onClick={this.handleClick}>
              <i className="user icon" />
            </button>
          </div>
        </div>
      </header>
    )
  }
}
