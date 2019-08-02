import React, { Component } from "react"

export default class Categories extends Component {
  render() {
    return (
      <React.Fragment>
        {this.props.categories.map((category, i) => (
          <option key={i} value={category.name}>
            {category.name}
          </option>
        ))}
      </React.Fragment>
    )
  }
}
