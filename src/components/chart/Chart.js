import React, { Component } from 'react'
import { Pie,Bar, Line } from 'react-chartjs-2'

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
      <React.Fragment>
        <Pie
          data={this.state.chartData}
          options={{
            legend: {
              display: false,
              position: "bottom"
            }
          }}
        />
      </React.Fragment>
    )
  }
}
