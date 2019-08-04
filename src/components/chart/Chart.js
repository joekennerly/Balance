import React, { Component } from 'react'
import { Pie } from 'react-chartjs-2'

export default class Chart extends Component {
  // state = { chartData: {} }
  // componentDidMount = () => this.setState({chartData:this.props.chartData})
  render() {
    return (
      <div className="chart">
        <Pie
          data={this.props.chartData}
          options={{
            title: {
              display: true,
              text: "Budget Categories",
              fontSize: 20
            },
            legend: {
              display: true,
              position: "left"
            }
          }}
        />
      </div>
    )
  }
}
