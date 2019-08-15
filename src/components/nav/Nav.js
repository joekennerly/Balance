import React, { Component } from "react"
import { Link } from "react-router-dom"
import { Menu } from "semantic-ui-react"

export default class Nav extends Component {
  logout = () => {
    this.props.setUser(null)
    sessionStorage.clear()
  }

  render() {
    return (
      <React.Fragment>
        <Menu inverted>
          <Menu.Menu position="right">
            <Menu.Item
              name="logout"
              as={Link}
              to="/"
              onClick={this.logout}
            />
          </Menu.Menu>
        </Menu>
      </React.Fragment>
    )
  }
}
