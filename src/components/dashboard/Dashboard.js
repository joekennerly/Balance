import React, { Component } from "react"
import Totals from "../totals/Totals"
import Chart from '../chart/Chart'

export default class Dashboard extends Component {
  state = {
    chartData: {}
  }
  componentWillMount = () => this.getChartData()

  mapProp = (property) => {
    let mapped = this.props.categories.map(category => {
      return category[property]
    })
    return mapped
  }

  getChartData() {
    this.setState({
      chartData:{
        labels: ["food", "utilities", "cats", "car", "rent", "misc."],
        datasets: [
          {
            data: [
              100,
              299,
              393,
              121,
              122,
              322
            ],
            backgroundColor: [
              "red",
              "orange",
              "yellow",
              "green",
              "blue",
              "indigo",
              "violet",
            ]
          }
        ]
      }
    })
  }
  render() {
    return (
      <React.Fragment>
        <Totals {...this.props} />
        <Chart chartData={this.state.chartData}/>
      </React.Fragment>
    )
  }
}
