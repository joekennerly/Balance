import React, { Component } from "react"
import { Link } from "react-router-dom"
import { Menu, Icon } from "semantic-ui-react"
let m = require("moment")

export default class Nav extends Component {
  state = {
    now: ""
  }
  handleItemClick = (e, { name }) => this.setState({ activeItem: name })
  logout = () => {
    this.props.setUser(null)
    sessionStorage.clear()
  }

  timer = setInterval(() => {
    this.setState({ now: m().format("dddd, MMMM D - h:mm:ss A") })
  }, 1000)

  render() {
    // console.log(this.state)
    const { activeItem } = this.state
    return (
      <React.Fragment>
        <Menu inverted>
          <Menu.Item
            name="dashboard"
            active={activeItem === "dashboard"}
            onClick={this.handleItemClick}
          >
            <Icon name="cog" />
          </Menu.Item>

          <Menu.Menu position="right">
            <Menu.Item>{this.state.now}</Menu.Item>
            <Menu.Item
              name="logout"
              as={Link}
              to="/"
              active={activeItem === "logout"}
              onClick={this.logout}
            />
          </Menu.Menu>
        </Menu>
      </React.Fragment>
    )
  }
}
