import React, { Component } from "react"
import { Pie } from "react-chartjs-2"
import { Segment } from "semantic-ui-react"

export default class Chart extends Component {
  state = {
    chartData: this.props.chartData
  }
  static getDerivedStateFromProps(props, current_state) {
    if (current_state.chartData !== props.chartData) {
      return {
        chartData: props.chartData
      }
    }
    return null
  }

  render() {
    return (
      <Segment textAlign="center" inverted>
        <Pie
          data={this.state.chartData}
          options={{
            legend: {
              display: true,
              position: "bottom"
            }
          }}
        />
      </Segment>
    )
  }
}
