import React, { Component } from "react"
import Totals from "../totals/Totals"
import Chart from "../chart/Chart"

export default class Dashboard extends Component {
  // state = {
  //   chartData: {}
  // }
  // componentWillMount = () => {
  //   console.log(this.props)
  //   this.setState({
  //     chartData: {
  //       labels: ["1", "2", "3", "4", "5", "6"],
  //       datasets: [
  //         {
  //           data: [100, 299, 393, 121, 122, 322],
  //           backgroundColor: [
  //             "red",
  //             "orange",
  //             "yellow",
  //             "green",
  //             "blue",
  //             "indigo",
  //             "violet"
  //           ]
  //         }
  //       ]
  //     }
  //   })
  // }
  render() {
    // console.log(this.props)
    return (
      <React.Fragment>
        <Totals {...this.props} />
        <Chart chartData={this.props.chartData} />
      </React.Fragment>
    )
  }
}
