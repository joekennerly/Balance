import React, { Component } from "react"
import Header from "./Header"
// import Totals from "./Totals"
import Expenses from "./Expenses"

export default class Dashboard extends Component {
  render() {
    return (
      <React.Fragment>
          <Header {...this.props} />
          {/* <Totals {...this.props}/> */}
          <Expenses {...this.props} />
      </React.Fragment>
    )
  }
}
