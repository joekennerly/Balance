import React, { Component } from 'react'
import { Pie } from 'react-chartjs-2'

export default class Chart extends Component {
  state = {
    chartData: this.props.chartData
  }
  static getDerivedStateFromProps(props, current_state) {
    if (current_state.chartData !== props.chartData)
    {
      return {
        chartData: props.chartData,

      }

    }
    return null
}

  render() {
    console.log("chart rendering", this.state)
    return (
      <div className="chart">
        <Pie
          data={this.state.chartData}
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
