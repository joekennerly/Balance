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
          <div className="ui dropdown icon item">
            <Link className="nav-link" to="/dashboard"><i className="bars icon" /></Link>
          </div>


          <div className="ui dropdown icon item">
            <Link className="nav-link" to="/budget"><i className="pie chart icon" /></Link>
          </div>

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
