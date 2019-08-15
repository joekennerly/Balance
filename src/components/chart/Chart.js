import React, { Component } from "react"
import { Pie } from "react-chartjs-2"
import { Segment, Header, Icon } from "semantic-ui-react"

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
    console.log(this.props.sum(this.props.categories))
    return (
      <Segment textAlign="center" inverted>
        <Header inverted size="huge">
          <div>
            <Icon name="circle" />
          </div>
          <div>
            {this.props.diff(
              this.props.sum(this.props.income),
              this.props.sum(this.props.expenses)
            )}
          </div>
        </Header>
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
