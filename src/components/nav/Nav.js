import React, { Component } from "react"
import { Link } from "react-router-dom"
import { Menu } from "semantic-ui-react"

export default class Nav extends Component {
  state = {}
  handleItemClick = (e, { name }) => this.setState({ activeItem: name })
  logout = () => {
    this.props.setUser(null)
    sessionStorage.clear()
  }
  // logout = () => sessionStorage.clear()
  render() {
    const { activeItem } = this.state
    return (
      <header>
        <Menu>
          <Menu.Item
            name="dashboard"
            as={Link}
            to="/dashboard"
            active={activeItem === "dashboard"}
            onClick={this.handleItemClick}
          >
            Dashboard
          </Menu.Item>

          <Menu.Item
            name="income"
            as={Link}
            to="/income"
            active={activeItem === "income"}
            onClick={this.handleItemClick}
          >
            Income
          </Menu.Item>

          <Menu.Item
            name="expenses"
            as={Link}
            to="/expenses"
            active={activeItem === "expenses"}
            onClick={this.handleItemClick}
          >
            Expenses
          </Menu.Item>

          <Menu.Item
            name="budget"
            as={Link}
            to="/budget"
            active={activeItem === "budget"}
            onClick={this.handleItemClick}
          >
            Budget
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
