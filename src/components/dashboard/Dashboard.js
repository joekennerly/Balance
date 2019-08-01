import React, { Component } from "react"
import Totals from "../totals/Totals"
import Expenses from "./Expenses"

export default class Dashboard extends Component {
  render() {
    return (
      <React.Fragment>
        <Totals {...this.props} />
        <Expenses {...this.props} />
      </React.Fragment>
    )
  }
}
