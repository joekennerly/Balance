import React, { Component } from "react"
import Chart from "../chart/Chart"
import Categories from "../categories/Categories"
import Totals from "../totals/Totals"
import Income from "../income/Income"
import { Segment, Sidebar, Icon, Menu, Button } from "semantic-ui-react"

export default class Dashboard extends Component {
  state = {
    menu: false
  }
  handleHideClick = () => this.setState({ menu: false })
  handleShowClick = () => this.setState({ menu: true })
  handleSidebarHide = () => this.setState({ menu: false })
  render() {
    const visible = this.state.menu
    return (
      <React.Fragment>
        <Totals {...this.props} />
        <Segment.Group as={Segment} inverted horizontal>
          <Sidebar.Pushable as={Segment}>
            <Sidebar
              inverted
              as={Menu}
              direction="right"
              animation="push"
              icon="labeled"
              onHide={this.handleSidebarHide}
              vertical
              visible={visible}
              width="very wide"
            />

            <Sidebar.Pusher>
              <Segment.Group as={Segment} inverted horizontal>
                <Categories {...this.props} />
                <Chart chartData={this.props.chartData} />
                <Income {...this.props} />
                <Button
                  disabled={visible}
                  as={Segment}
                  onClick={this.handleShowClick}
                >
                  <Icon size="large" inverted name="plus" />
                </Button>
              </Segment.Group>
            </Sidebar.Pusher>
          </Sidebar.Pushable>
        </Segment.Group>
      </React.Fragment>
    )
  }
}
