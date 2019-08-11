import React, { Component } from "react"
import Totals from "../totals/Totals"
import Chart from "../chart/Chart"
import Categories from "../form/Categories"
import {
  Button,
  Header,
  Icon,
  Image,
  Menu,
  Segment,
  Sidebar
} from "semantic-ui-react"
import Expenses from "../expenses/Expenses"
import Income from "../income/Income"

export default class Dashboard extends Component {
  state = { visible: false }

  handleHideClick = () => this.setState({ visible: false })
  handleShowClick = () => this.setState({ visible: true })
  handleSidebarHide = () => this.setState({ visible: false })
  render() {
    const { visible } = this.state
    return (
      <React.Fragment>
        <Button.Group>
          <Button disabled={visible} onClick={this.handleShowClick}>
            Show sidebar
          </Button>
          <Button disabled={!visible} onClick={this.handleHideClick}>
            Hide sidebar
          </Button>
        </Button.Group>

        <Sidebar.Pushable>
          <Sidebar
            as={Menu}
            animation="overlay"
            icon="labeled"
            inverted
            onHide={this.handleSidebarHide}
            vertical
            visible={visible}
            width="wide"
          >
              <Categories {...this.props} />

          </Sidebar>

          <Sidebar.Pusher>
            <Segment basic>
              <Totals {...this.props} />
              <Chart chartData={this.props.chartData} />
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </React.Fragment>
    )
  }
}
