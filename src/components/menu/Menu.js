import React, { Component } from "react"
import { Link } from "react-router-dom"

export default class Menu extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="ui tabular menu">
          <div className="active item">All</div>
          <div className="item">Food</div>
          <div className="item">Utilities</div>
          <div className="item">Cats</div>
          <div className="item">Car</div>
          <div className="right menu">
            {/* <div className="item">
              <div className="ui icon input">
                <input type="text" placeholder="Search..." />
                <i className="search icon" />
              </div>
            </div> */}
            <div className="item">
              <Link to="/budget">
                <button className="ui button">
                  <div>
                    <i className="cog icon" /> Manage Categories
                  </div>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}
