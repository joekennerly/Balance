import React, { Component } from "react"
import { Link } from "react-router-dom"

export default class Nav extends Component {
  handleClick = () => {
    sessionStorage.clear()
  }

  render() {
    return (
      <header>
        <div className="ui top attached menu">
          <Link to="/">
            <div className="ui dropdown icon item">
              <i className="home icon"></i>
              {/* <p>Home</p> */}
            </div>
          </Link>
          <Link to="/income">
            <div className="ui dropdown icon item">
              <div>Income</div>
              <div>$0.00</div>
            </div>
          </Link>
          <Link to="/expenses">
            <div className="ui dropdown icon item">
              <div>Expenses</div>
              <div>$0.00</div>
            </div>
          </Link>
          <Link to="/balance">
            <div className="ui dropdown icon item">
              <div>Balance</div>
              <div>$0.00</div>
            </div>
          </Link>

          {/* <Link to="/budget">
            <div className="ui dropdown icon item">
              <i className="pie chart icon" />
              <p>Budget</p>
            </div>
          </Link> */}

          <div className="ui right menu">
            <Link to="/login">
              <button className="ui button" onClick={this.handleClick}>
                <p>Logout</p>
              </button>
            </Link>
          </div>
        </div>
      </header>
    )
  }
}
