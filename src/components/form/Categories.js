import React, { Component } from "react"
import { Button } from "semantic-ui-react"

export default class Categories extends Component {
  add = () => this.props.addItem("categories", {
    "name": "woo woo",
    "user_Id": 1,
    "amount": 300,
  }, "/budget")
  del = (e) => this.props.deleteItem("categories", e.target.id.split("-")[1], "/budget")

  render() {
    return (
      <React.Fragment>
        <Button onClick={this.add}>+ Add Category</Button>
        {this.props.categories.map((category) => (
          <div key={category.id} value={category.name}>
            {category.name}: ${category.amount}
            <Button id={`category-${category.id}`} onClick={this.del}>x</Button>
          </div>
        ))}
      </React.Fragment>
    )
  }
}
