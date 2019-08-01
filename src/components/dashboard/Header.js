import React, { Component } from "react"

export default class Header extends Component {
  handleClick = () => {
    sessionStorage.clear()
    this.props.history.push("/login")
  }

  render() {
    return (
      <header>
        <div className="ui top attached menu">
          <div className="ui dropdown icon item">
            <i className="bars icon" />
            <div className="menu">
              <div className="item">
                <i className="dropdown icon" />
                <span className="text">New</span>
                <div className="menu">
                  <div className="item">Document</div>
                  <div className="item">Image</div>
                </div>
              </div>
              <div className="item">Open...</div>
              <div className="item">Save...</div>
              <div className="item">Edit Permissions</div>
              <div className="divider" />
              <div className="header">Export</div>
              <div className="item">Share...</div>
            </div>
          </div>
          <div className="ui dropdown icon item">
            <i className="pie graph icon" />
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
