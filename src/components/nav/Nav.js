import React, { Component } from "react"
import { Link } from "react-router-dom"
import { Menu } from "semantic-ui-react"

export default class Nav extends Component {
  state = {}

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  logout = () => sessionStorage.clear()

  render() {
    const { activeItem } = this.state
    return (
      <header>
        <Menu>
          <Menu.Item
            name="editorials"
            as={Link}
            to="/"
            active={activeItem === "editorials"}
            onClick={this.handleItemClick}
          >
            Dashboard
          </Menu.Item>

          <Menu.Item
            name="reviews"
            as={Link}
            to="/income"
            active={activeItem === "reviews"}
            onClick={this.handleItemClick}
          >
            Income
          </Menu.Item>

          <Menu.Item
            name="upcomingEvents"
            as={Link}
            to="/expenses"
            active={activeItem === "upcomingEvents"}
            onClick={this.handleItemClick}
          >
            Expenses
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
      </header>
    )
  }
}
