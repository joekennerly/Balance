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
    return (
      <div className="chart">
        <Pie
          data={this.state.chartData}
          options={{
            legend: {
              display: false,
              position: "bottom"
            }
          }}
        />
      </div>
    )
  }
}
