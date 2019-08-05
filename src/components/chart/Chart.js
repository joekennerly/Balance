import React, { Component } from 'react'
import { Pie } from 'react-chartjs-2'

export default class Chart extends Component {
  render() {
    return (
      <div className="chart">
        <Pie
          data={this.props.chartData}
          options={{
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
