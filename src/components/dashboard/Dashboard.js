import React, { Component } from "react"
import Chart from "../chart/Chart"
import Categories from "../form/Categories"
import Totals from "../totals/Totals"
import Income from "../income/Income"
import { Segment, Sidebar, Icon, Menu, Button } from "semantic-ui-react"

export default class Dashboard extends Component {
  state = {
    visible: false
  }
  handleHideClick = () => this.setState({ visible: false })
  handleShowClick = () => this.setState({ visible: true })
  handleSidebarHide = () => this.setState({ visible: false })
  render() {
    const visible = this.state.visible
    return (
      <React.Fragment>
        <Totals {...this.props} />
        <Segment.Group as={Segment}inverted horizontal>
          <Sidebar.Pushable as={Segment}>
            <Sidebar
              inverted
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
              <Segment.Group as={Segment} inverted horizontal>
                <Button disabled={visible} as={Segment} onClick={this.handleShowClick}>
                    <Icon  size="large" inverted name="plus" />
                  </Button>
                  <Chart chartData={this.props.chartData} />
                <Categories {...this.props} />
              </Segment.Group>
            </Sidebar.Pusher>
          </Sidebar.Pushable>
        </Segment.Group>
      </React.Fragment>
    )
  }
}
