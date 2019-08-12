import React, { Component } from "react"
import Chart from "../chart/Chart"
import Categories from "../form/Categories"
import Totals from "../totals/Totals"
import Income from "../income/Income"
import { Segment, Sidebar, Menu, Button } from "semantic-ui-react"

export default class Dashboard extends Component {
  state = {
    visible: false,
  }
  handleHideClick = () => this.setState({ visible: false })
  handleShowClick = () => this.setState({ visible: true })
  handleSidebarHide = () => this.setState({ visible: false })
  render() {
    const { visible } = this.state
    return (
      <React.Fragment>
        <Totals {...this.props} />
        <Button.Group>
          <Button disabled={visible} onClick={this.handleShowClick}>
            Show Income
          </Button>
        </Button.Group>
        <Segment.Group horizontal>
          <Sidebar.Pushable as={Segment}>
            <Sidebar
              as={Menu}
              animation="push"
              icon="labeled"
              onHide={this.handleSidebarHide}
              vertical
              visible={visible}
              width="very wide"
            >
              <Income {...this.props} />
            </Sidebar>

            <Sidebar.Pusher>
              <Segment.Group horizontal>
                <Segment>
                  <Chart chartData={this.props.chartData} />
                </Segment>
                <Categories {...this.props} />

              </Segment.Group>
            </Sidebar.Pusher>
          </Sidebar.Pushable>
        </Segment.Group>
      </React.Fragment>
    )
  }
}
