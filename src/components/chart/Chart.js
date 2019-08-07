import React, { Component } from 'react'
import { Pie } from 'react-chartjs-2'

export default class Chart extends Component {
  state = {
    chartData: this.props.chartData
  }

  render() {
    return (
      <div className="chart">
        <Pie
          data={this.props.chartData}
          options={{
            title: {
              display: true,
              text: "Budget Percentages",
              fontSize: 18
            },
            legend: {
              display: true,
              position: "bottom"
            }
          }}
        />
      </div>
    )
  }
}
