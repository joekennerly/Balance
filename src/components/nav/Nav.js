import React, { Component } from "react"
import { Link } from "react-router-dom"
import { Menu, Icon } from "semantic-ui-react"

export default class Nav extends Component {
  state = {}
  handleItemClick = (e, { name }) => this.setState({ activeItem: name })
  logout = () => {
    this.props.setUser(null)
    sessionStorage.clear()
  }
  render() {
    const { activeItem } = this.state
    return (
        <Menu inverted size="massive"  >
          <Menu.Item
            name="dashboard"
            active={activeItem === "dashboard"}
            onClick={this.handleItemClick}
          >
            <Icon name="balance scale"/>
          </Menu.Item>

          <Menu.Menu position='right'>
            <Menu.Item
              name='logout'
              as={Link}
              to="/"
              active={activeItem === 'logout'}
              onClick={this.logout}
            />
          </Menu.Menu>
        </Menu>
    )
  }
}
