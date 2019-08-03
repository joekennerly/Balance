import React, { Component } from "react"
import Totals from "../totals/Totals"

export default class Dashboard extends Component {
  render() {
    return (
      <React.Fragment>
        <Totals {...this.props} />
      </React.Fragment>
    )
  }
}
