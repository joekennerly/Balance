import React, { Component } from "react"
import Totals from "../totals/Totals"
import Chart from "../chart/Chart"
import Categories from "../form/Categories"

export default class Dashboard extends Component {
  render() {

    return (
      <React.Fragment>
        <Totals {...this.props} />
        <Chart chartData={this.props.chartData} />
        <Categories {...this.props} />
      </React.Fragment>
    )
  }
}
