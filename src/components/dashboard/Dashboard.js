import React, { Component } from "react"
import Chart from "../chart/Chart"
import Categories from "../categories/Categories"
import Totals from "../totals/Totals"
import Income from "../income/Income"
import { Segment } from "semantic-ui-react"
import Outlook from "../outlook/Outlook";

export default class Dashboard extends Component {
  render() {
    return (
      <Segment inverted>
        <Totals {...this.props} />
        <Segment.Group as={Segment} inverted horizontal>
          <Categories {...this.props} />
          <Chart {...this.props} />
          <Income {...this.props} />
        </Segment.Group>
        <Outlook {...this.props}/>
      </Segment>
    )
  }
}
