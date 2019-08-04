import React, { Component } from "react"
import Totals from "../totals/Totals"
import Chart from '../chart/Chart'

export default class Dashboard extends Component {
  render() {
    return (
      <React.Fragment>
        <Totals {...this.props} />
        <div>Set new budget</div>
        <Chart />
      </React.Fragment>
    )
  }
}
