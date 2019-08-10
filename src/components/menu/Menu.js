import React, { Component } from "react"
import { Link } from "react-router-dom"
import { Menu } from "semantic-ui-react"

export default class CategoryMenu extends Component {
  state = { activeItem: "all" }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state
    return (
      <Menu inverted tabular size="large">
        <Menu.Item
          name="all"
          as={Link}
          to="/expenses"
          active={activeItem === "all"}
          onClick={this.handleItemClick}
        />
        {this.props.categories.map(category => (
          <Menu.Item
            key={category.id}
            name={category.name}
            as={Link}
            to={`/expenses/${category.name}`}
            active={activeItem === `${category.name}`}
            onClick={this.handleItemClick}
          />
        ))}
      </Menu>
    )
  }
}
