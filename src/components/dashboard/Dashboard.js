import React, { Component } from "react"
import Chart from "../chart/Chart"
import Categories from "../categories/Categories"
import Totals from "../totals/Totals"
import Income from "../income/Income"
import { Segment } from "semantic-ui-react"

export default class Dashboard extends Component {
  render() {
    return (
      <React.Fragment>
        <Totals {...this.props} />
        <Segment.Group as={Segment} inverted horizontal>
          <Categories {...this.props} />
          <Chart chartData={this.props.chartData} />
          <Income {...this.props} />
        </Segment.Group>
      </React.Fragment>
    )
  }
}
