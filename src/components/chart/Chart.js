import React, { Component } from 'react'
import { Pie } from 'react-chartjs-2'

export default class Chart extends Component {
  state = {
    chartData: {
      labels: ["one", "two", "three", "four", "five", "six"],
      datasets: [
        {
          label: "numbers",
          data: [
            100,
            299,
            393,
            121,
            122,
            322
          ],
          backgroundColor: [
            "green",
            "red",
            "blue",
            "yellow",
            "purple",
            "lightblue"
          ]
        }
      ]
    }
  }

  render() {
    return (
      <div className="chart">
        <Pie
          data={this.state.chartData}
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
