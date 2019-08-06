import React, { Component } from "react"
import Totals from "../totals/Totals"
import Chart from "../chart/Chart"
import Budget from "../budget/Budget"

export default class Dashboard extends Component {
  render() {
    return (
      <React.Fragment>
        <Totals {...this.props} />
        <Chart chartData={this.props.chartData} />
        <Budget {...this.props} />
      </React.Fragment>
    )
  }
}
