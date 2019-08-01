import React, { Component } from "react"

export default class Menu extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="ui tabular menu">
          <div className="active item">All</div>
          <div className="item">Year</div>
          <div className="item">Quarter</div>
          <div className="item">Month</div>
          <div className="item">Week</div>
          <div className="right menu">
            <div className="item">
              <div className="ui icon input">
                <input type="text" placeholder="Search..." />
                <i className="search icon" />
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}
