import React, { Component } from "react"
import Chart from "../chart/Chart"
import Categories from "../form/Categories"
import Totals from "../totals/Totals"
import { Menu, Sidebar, Segment } from "semantic-ui-react"

export default class Dashboard extends Component {
  render() {
    return (
      <React.Fragment>
        <Totals {...this.props} />
        <Segment.Group horizontal>
          <Segment>
              <Chart chartData={this.props.chartData} />
          </Segment>
            <Categories {...this.props} />
        </Segment.Group>
      </React.Fragment>
    )
  }
}
