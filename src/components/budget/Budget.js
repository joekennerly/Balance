import React, { Component } from "react"
import Categories from "../form/Categories"

export default class Budget extends Component {
  total = property => this.props.sum(this.props[property])
  filterByDate(resourceArray, time) {
    let filtered = []
    if (time === this.currentYear) {
      filtered = this.props[resourceArray].filter(resourceElement => {
        console.log(resourceElement.date.split("-")[0])
        return resourceElement.date.split("-")[0] === time
      })
    } else if (time === this.currentMonth) {
      filtered = this.props[resourceArray].filter(resourceElement => {
        console.log(resourceElement.date.split("-")[1])
        return resourceElement.date.split("-")[1] === time
      })
    }
    console.log(filtered)
  }
  calcPercent = (amount) => ((amount/this.props.total("income")) * 100).toFixed(2)
  render() {
    return (
      <div>
        <Categories {...this.props} />
      </div>
    )
  }
}
